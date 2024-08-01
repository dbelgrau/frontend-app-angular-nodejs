const uuid = require('uuid');

const users = [
  {
    id: "3cb40eae-508c-4089-8123-4d16f4c7a8cd",
    name: "Jarek",
    role: "USER",
    age: 74
  },
  {
    id: "c435cf5a-7a78-4b5c-b4cb-f8c40fc3bf69",
    name: "Doniek",
    role: "ADMIN",
    age: 66
  },
  {
    id: "33a33611-8345-47cd-8cd2-bb58a3034122",
    name: "Szymek",
    role: "USER",
    age: 47
  },
  {
    id: "97e38ff3-80d8-441a-b09e-b3488ad833cc",
    name: "Władek",
    role: "USER",
    age: 42
  },
  {
    id: "fd96426f-311e-42cc-80cd-458d9bf55169",
    name: "Sławek",
    role: "USER",
    age: 37
  },
  {
    id: "15ae3df7-12a4-43bc-a22b-9e1a88c7550a",
    name: "Włodek",
    role: "USER",
    age: 63
  }
]

const posts = [
  {
    id: uuid.v4(),
    author: users[0].id,
    title: "Witam",
    tags: ["HUMOR"],
    date: "2024-01-30",
    content: "Jezioro moje, w gładkiej toni\nwidziałem kiedyś dziecka twarz.\nJakiż to wiatr te fale gonił,\nco odebrały oczom blask? ",
    verified: false
  },
  {
    id: uuid.v4(),
    author: users[1].id,
    title: "Siema",
    tags: ["HUMOR"],
    date: "2024-01-25",
    content: "And so he spoke, and so he spoke\nThat lord of Castamere\nBut now the rains weep o'er his hall\nWith no one there to hear",
    verified: true
  },
  {
    id: uuid.v4(),
    author: users[2].id,
    title: "Co tam?",
    tags: ["HUMOR"],
    date: "2024-01-20",
    content: "Yo, ho, haul together,\nHoist the colours high.\nHeave ho, thieves and beggars,\nNever shall we die.",
    verified: false
  },
  {
    id: uuid.v4(),
    author: users[3].id,
    title: "Tyle to nie",
    tags: ["HUMOR"],
    date: "2024-01-18",
    content: "To wycieczka do miejsca gdzie śmierć nie będzie nagła\nW laboratorium diabła krew spływa do wiadra\nOpętany kapłan chłosta się przy pomocy kabla\nUkładając na ziemi z bezgłowych ciał pentagram",
    verified: true
  },
  {
    id: uuid.v4(),
    author: users[4].id,
    title: "Łutyt",
    tags: ["HUMOR"],
    date: "2024-01-11",
    content: "The dwarves of yore made mighty spells,\nWhile hammers fell like ringing bells,\nIn places deep, where dark things sleep,\nIn hollow halls beneath the fells.",
    verified: false
  },
  {
    id: uuid.v4(),
    author: users[5].id,
    title: "Szczęść Boże, ratuj się kto może",
    tags: ["HUMOR"],
    date: "2024-01-01",
    content: "Far from the fjords and the ice cold currents\nRavens soar over new frontiers\nSongs and sagas of a fate determined\nShields and spears",
    verified: false
  },
  {
    id: uuid.v4(),
    author: users[0].id,
    title: "Tytus Bomba",
    tags: ["HUMOR"],
    date: "2023-12-30",
    content: "When a humble bard\nGraced a ride along\nWith Geralt of Rivia\nAlong came this song",
    verified: true
  }
]

const logins = [
  {
    id: uuid.v4(),
    userId: users[0].id,
    email: "jan@gmail.com",
    password: "$2b$10$6xM.PCLgSVpyU.tc9j9or.MZ/SZzY9SivgChKLQ0EeS8r0Efu3BQe"
  },
  {
    id: uuid.v4(),
    userId: users[5].id,
    email: "maria@gmail.com",
    password: "$2b$10$rbBY7a87e4TEKPBRHuXN2eKZMoqS0hkpMh3Ng2uGUINr4IhMu3Ic."
  },
  {
    id: uuid.v4(),
    userId: users[1].id,
    email: "admin@gmail.com",
    password: "$2b$10$P7tvee0WxSWgk7sml.omoe2UIzFJXbOSgicjaoYzoWmWEFvLy5U2e"
  }
  
]

module.exports = {
    users: users,
    posts: posts,
    logins: logins
  }