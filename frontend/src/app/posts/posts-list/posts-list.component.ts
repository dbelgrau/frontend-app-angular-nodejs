import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/data/post.model';
import { PostService } from 'src/app/shared/services/data/post/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  protected posts: Post[] = [];
  protected filteredPosts: Post[] = [];
  protected paginatedPosts: Post[] = [];

  protected titleFilter: string = '';
  protected tagFilter: string = '';
  protected verifiedFilter: boolean = false;

  protected itemsPerPage: number = 3;
  protected currentPage: number = 1;

  private sub: Subscription | null = null;

  public constructor(
    private postService: PostService,
    private router: Router
  ) {}

  //#region setup
  public ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.sub = this.postService.posts.subscribe((postList: Post[]) => {
      this.posts = postList;
      this.filteredPosts = [...this.posts];
      this.applyFilters();
      this.sortByDate();
    });
  }
  //#endregion

  //#region sort
  protected sortByTitle(): void {
    this.filteredPosts.sort((a: Post, b: Post) => a.title.localeCompare(b.title));
    this.paginate();
  }

  protected sortByAuthorAge(): void {
    this.filteredPosts.sort((a: Post, b: Post) => a.author.age - b.author.age);
    this.paginate();
  }

  protected sortByDate(): void {
    this.filteredPosts.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.paginate();
  }
  //#endregion

  //#region filter
  protected applyFilters(): void {
    this.filteredPosts = this.posts.filter((post: Post) => this.filterByTitle(post) && this.filterByTag(post) && this.filterByVerified(post));
    this.sortByDate();
    this.paginate();
  }

  protected paginate(): void {
    const startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;

    this.paginatedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  private filterByTitle(post: Post): boolean {
    return post.title.toLowerCase().includes(this.titleFilter.toLowerCase());
  }

  private filterByTag(post: Post): boolean {
    if (!this.tagFilter) return true;
    
    return post.tags.some((tag: string) => tag.toLowerCase() === this.tagFilter.toLowerCase());
  }

  private filterByVerified(post: Post): boolean {
    if (this.verifiedFilter === false) return true;
    
    return post.verified === true;
  }

  protected clearFilters(): void {
    this.titleFilter = '';
    this.tagFilter = '';
    this.verifiedFilter = false;
    this.applyFilters();
  }
  //#endregion

  //#region routing
  protected goToDetails(id: string): void {
    this.router.navigate(['posts', 'details', id]);
  }

  protected goToCreate(): void {
    this.router.navigate(['posts', 'form']);
  }

  protected goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }
  
  protected goToNextPage(): void {
    const maxPage: number = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.applyFilters();
    }
  }
  //#endregion

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
