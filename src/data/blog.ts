export interface Block {
  type: "p" | "h2" | "quote" | "ul";
  text?: string;
  items?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // human label
  iso: string; // for sorting
  readTime: string;
  category: "AI" | "DevOps" | "Engineering" | "Testing" | "Career";
  tags: string[];
  body: Block[];
}

/* Helpful explainers written to teach the reader — not self-promotion.
   Add more as you learn; your DevOps notes live in the vault. */
export const posts: Post[] = [
  {
    slug: "how-dns-actually-works",
    title: "How DNS actually works (and why it breaks your deploys)",
    excerpt:
      "DNS is the internet's contact list. Understanding the lookup chain — and the one word, TTL — explains a shocking number of production incidents.",
    date: "Jun 2026",
    iso: "2026-06-22",
    readTime: "6 min",
    category: "DevOps",
    tags: ["DevOps", "Networking", "Fundamentals"],
    body: [
      { type: "p", text: "When you type a website name, your computer has a problem: it can't talk to names, only to numbers (IP addresses). DNS is the system that turns one into the other. Think of it as the internet's contact list — you know “Mom,” your phone knows the number." },
      { type: "h2", text: "It's a chain, not a server" },
      { type: "p", text: "The big misconception is that DNS is “a server you ask.” It's actually a cached chain of lookups, and the caching is the whole point:" },
      { type: "ul", items: [
        "Your browser cache — heard this name recently? Done.",
        "Your OS cache — same question, slightly wider.",
        "A recursive resolver (your ISP, or 8.8.8.8 / 1.1.1.1) — the one that does the real legwork.",
        "If nobody knows, the resolver walks the hierarchy: root servers → the .com servers → the domain's own authoritative name server, which finally returns the IP.",
      ] },
      { type: "h2", text: "Why you should care: TTL" },
      { type: "p", text: "Every DNS answer is cached for a duration called its TTL (time to live). This is the source of a classic incident: you point your domain at a new server, it works for you, but some users still hit the old one for hours. They're not broken — their resolver cached the old record and the TTL hasn't expired. Lower your TTL before a migration, raise it after." },
      { type: "quote", text: "“It works on my machine but not for that user” is, more often than people admit, a stale DNS cache somewhere in the chain." },
      { type: "p", text: "You can get far as a developer without this. But the day a deploy “half-works,” DNS is one of the first three things to check — and now you'll know where to look." },
    ],
  },
  {
    slug: "load-balancers-and-cdns",
    title: "Load balancers & CDNs, explained at a chai stall",
    excerpt:
      "No diagrams, no jargon — just the analogy that finally makes two of the most important scaling concepts click.",
    date: "Jun 2026",
    iso: "2026-06-10",
    readTime: "4 min",
    category: "DevOps",
    tags: ["DevOps", "Scale", "Fundamentals"],
    body: [
      { type: "p", text: "Picture the busiest chai stall in the city. One person, one stove, a line out the door. That's a single server, and it's about to fall over. How do you fix it without the line collapsing into chaos?" },
      { type: "h2", text: "Load balancer: more stoves, one queue" },
      { type: "p", text: "You add three more chai-wallahs and put one calm person at the front whose only job is to send each customer to whichever stove is free. That calm person is a load balancer. Customers don't know or care which stove makes their cutting chai — the line just keeps moving. The IP you connect to for a big website is usually that calm person, not the stove." },
      { type: "h2", text: "CDN: a stall on every corner" },
      { type: "p", text: "Now imagine the same chai is available at a stall on every street corner, so nobody walks far. That's a CDN (content delivery network) — copies of your static content cached at edge locations physically near each user. It's why a video or image loads instantly: it isn't crossing the planet from one origin, it's coming from the corner down your street." },
      { type: "quote", text: "Load balancer: spread the crowd across identical workers. CDN: move the content closer to the crowd." },
      { type: "p", text: "Most of what people call “scaling” is some combination of these two moves — just wrapped in cloud pricing pages and intimidating diagrams." },
    ],
  },
  {
    slug: "docker-in-one-sentence",
    title: "Docker in one sentence: a beginner's mental model",
    excerpt:
      "Containers confuse a lot of people for far too long. One sentence collapses the whole concept into something obvious. Here it is.",
    date: "May 2026",
    iso: "2026-05-24",
    readTime: "4 min",
    category: "DevOps",
    tags: ["DevOps", "Docker", "Fundamentals"],
    body: [
      { type: "p", text: "If Docker has been on your “I'll understand it later” list, here's the sentence that ends the wait: a container is your app plus everything it needs to run, packed into one box that behaves the same everywhere." },
      { type: "p", text: "That's the magic. “It works on my machine” becomes “it works in the box, and I ship the box.”" },
      { type: "h2", text: "The two words people mix up" },
      { type: "ul", items: [
        "Image = the recipe. It's your Dockerfile, built — a frozen snapshot of the app and its dependencies.",
        "Container = a running instance of that recipe. You can start many from one image.",
      ] },
      { type: "p", text: "The same image runs identically on your laptop, the CI runner, and production. The environment stops being a fragile thing you set up by hand and becomes code you can version, review, and trust." },
      { type: "h2", text: "Why it's worth your afternoon" },
      { type: "p", text: "Before containers, onboarding a teammate meant a README full of “install this exact version, set these env vars, pray.” A Dockerfile turns that prayer into a recipe the computer follows the same way every time. You stop debugging environments and start debugging actual problems." },
      { type: "quote", text: "You don't always need a better tutorial. Sometimes you need one good sentence — and then to just run the thing." },
    ],
  },
  {
    slug: "spaced-repetition-for-engineers",
    title: "Stop forgetting what you learn: spaced repetition for engineers",
    excerpt:
      "You solve the problem, you feel smart, you forget it in a week. Here's the learning technique that fixes that — borrowed from language learners and weirdly underused by devs.",
    date: "May 2026",
    iso: "2026-05-08",
    readTime: "4 min",
    category: "Career",
    tags: ["Learning", "DSA", "Productivity"],
    body: [
      { type: "p", text: "Be honest: how many times have you solved a problem, felt genuinely clever, and then drawn a complete blank on it a week later? It's not a you problem. It's how memory works — without reinforcement, knowledge has a brutally short shelf life." },
      { type: "h2", text: "The trick language learners figured out" },
      { type: "p", text: "Spaced repetition is simple: review something right before you're about to forget it, and each successful recall pushes the next “forget point” further out. Review on day 1, then 3, then 7, then 16… The intervals stretch as the memory hardens. Flashcard apps have used this for decades. Engineers mostly don't, and it's a missed trick." },
      { type: "h2", text: "How to actually apply it to code" },
      { type: "ul", items: [
        "After solving something tricky, write a one-line summary of the pattern — not the whole solution, the idea.",
        "Schedule three resurfaces: in a few days, a couple weeks, a month.",
        "On each resurface, try to re-derive it before peeking. The struggle is the point.",
        "Review your own old code, not someone's polished editorial — it's stickier because it's yours.",
      ] },
      { type: "quote", text: "Your brain is a cache. Everything you learn has a TTL. Spaced repetition just schedules the refresh before the entry expires." },
      { type: "p", text: "Grinding 300 problems and forgetting 280 isn't learning — it's cardio. Space the reviews and you'll actually keep what you earn." },
    ],
  },
  {
    slug: "killing-flaky-tests",
    title: "Tests that don't lie: how to kill flaky tests",
    excerpt:
      "A flaky test is worse than no test — it teaches your whole team to ignore the colour red. Here's why tests flake and how to make them deterministic.",
    date: "Apr 2026",
    iso: "2026-04-28",
    readTime: "5 min",
    category: "Testing",
    tags: ["Testing", "Quality", "CI"],
    body: [
      { type: "p", text: "There's a quiet killer in test suites, and it isn't low coverage. It's flakiness — tests that pass and fail randomly with no code change. One flaky test feels harmless. But it slowly trains everyone to shrug at a red build, and the day red actually means something, nobody looks." },
      { type: "quote", text: "A flaky test doesn't just fail to catch bugs. It actively destroys trust in every other test you have." },
      { type: "h2", text: "Why tests flake" },
      { type: "p", text: "Almost all flakiness comes down to a few causes, and most are about time:" },
      { type: "ul", items: [
        "Waiting for time instead of state — sleep(2000) and hope the page loaded. It usually did. Until the CI runner was slow.",
        "Shared state between tests — one test leaves data behind that another trips over, depending on order.",
        "Real network or real clocks — anything you don't control will eventually betray you.",
        "Animations and async UI — asserting before the interface has settled.",
      ] },
      { type: "h2", text: "How to make them honest" },
      { type: "p", text: "Wait for state, never for time: assert that the element is visible, the request finished, the text appeared — modern tools like Playwright auto-wait for exactly this. Isolate every test so it sets up and tears down its own data. Mock the things you don't own (clocks, third-party APIs). And quarantine a flaky test the moment you spot it — a known-broken test out of the way beats a random one poisoning the whole suite." },
      { type: "p", text: "A green build should mean “ship it.” Protect that meaning ruthlessly." },
    ],
  },
  {
    slug: "working-with-ai-pair-programmers",
    title: "The blank file is dead: how to actually work with AI pair programmers",
    excerpt:
      "AI didn't take the job — it took the intimidating empty editor. What's left is the part that was always the real work. Here's how to keep your edge.",
    date: "Apr 2026",
    iso: "2026-04-09",
    readTime: "5 min",
    category: "AI",
    tags: ["AI", "Workflow", "Productivity"],
    body: [
      { type: "p", text: "The scariest thing in programming used to be the blinking cursor in an empty file. AI mostly killed that — you start with intent and get a confident first draft. That's a genuine gift. It's also a trap if you let it think for you." },
      { type: "h2", text: "The bottleneck moved, it didn't vanish" },
      { type: "p", text: "Generating code was never the hard part. Deciding what to build, catching the subtle bug the model introduced with total confidence, knowing that an abstraction will hurt in six months — that's the job, and AI made it more important, not less. When everyone can generate code, the rare skill is knowing which code deserves to exist." },
      { type: "h2", text: "Habits that keep you sharp" },
      { type: "ul", items: [
        "Read every diff. All of it. If you're merging code you can't explain, you're not the author — you're the rubber stamp.",
        "Make the AI justify itself. “Why this approach over X?” surfaces the tradeoffs it skipped.",
        "Build something from scratch on purpose, sometimes — like taking the stairs when there's an elevator. It's how you stay able to judge the elevator.",
        "Keep the model on a short leash for unfamiliar territory; give it more rope where you can verify fast.",
      ] },
      { type: "quote", text: "Lean on the tools hard. Just never outsource the taste — that's the only part that was ever really yours." },
      { type: "p", text: "The engineers who win this era aren't the ones who refuse AI or the ones who blindly trust it. They're the ones who stay good enough to tell when it's wrong." },
    ],
  },
  {
    slug: "feeding-context-to-llms",
    title: "Garbage in, confident nonsense out: feeding context to an LLM",
    excerpt:
      "Everyone obsesses over which model to use. The quiet truth of building useful AI features is that your context matters more than your model.",
    date: "Mar 2026",
    iso: "2026-03-26",
    readTime: "5 min",
    category: "AI",
    tags: ["AI", "RAG", "Architecture"],
    body: [
      { type: "p", text: "If you build one AI feature, you'll learn this fast: the model is only as good as what you feed it. A bigger model can't save you from messy input — it'll just produce more fluent nonsense. The unglamorous lever almost nobody talks about is context quality." },
      { type: "h2", text: "Structure beats volume" },
      { type: "p", text: "Dumping an entire scraped HTML page into the prompt is the worst possible fuel — navbars, footers, ads, all competing for the model's attention. Clean, structured data (defined fields, clear types, real relationships) is the best. The same question with tidy context gets a dramatically better answer than with a giant blob, even on the same model." },
      { type: "quote", text: "Garbage context in, confident nonsense out. Most “the AI is dumb” problems are really “my input was a mess” problems." },
      { type: "h2", text: "A practical checklist" },
      { type: "ul", items: [
        "Retrieve only what's relevant — fewer, sharper chunks beat the whole document.",
        "Strip boilerplate before it ever reaches the prompt.",
        "Give the model structure (headings, fields, labels), not soup.",
        "Tell it what to do when it doesn't know — “say you're unsure” prevents a lot of made-up answers.",
      ] },
      { type: "p", text: "Spend your energy on clean, well-structured context and the model part gets surprisingly easy. The future worth betting on isn't bigger models — it's better fuel flowing into them." },
    ],
  },
  {
    slug: "choosing-boring-technology",
    title: "Boring technology wins: how to choose a stack",
    excerpt:
      "Every few months a shiny new framework declares the old one dead. Here's a calmer way to pick what you build on — and where to actually spend your innovation budget.",
    date: "Mar 2026",
    iso: "2026-03-11",
    readTime: "4 min",
    category: "Engineering",
    tags: ["Architecture", "Opinion", "Decisions"],
    body: [
      { type: "p", text: "New developers feel constant pressure to use the newest thing. But here's a pattern you'll notice in teams that ship reliably: they're boringly conservative about their core stack and adventurous only where it counts." },
      { type: "h2", text: "Why boring is a feature" },
      { type: "p", text: "Mature, “boring” tools have a superpower: when something breaks at 11pm, you are not the first person to hit that error. The answer is on Stack Overflow, the docs are battle-tested, and you can hire people who already know it. That's not stagnation — that's leverage you get for free." },
      { type: "quote", text: "Choose boring technology for the parts that must work. Save your innovation budget for the parts that make you special." },
      { type: "h2", text: "A simple rule" },
      { type: "p", text: "Every team gets a limited number of “innovation tokens” — risky, unfamiliar choices you can afford before the unknowns start compounding. Spend them on the thing that's actually your edge, and use proven, dull technology for everything else. A database is rarely your differentiator; your product is." },
      { type: "p", text: "Learn the shiny things constantly — curiosity is the job. Just don't confuse learning a tool with betting a product on it. The best stack is the one you can confidently debug at midnight." },
    ],
  },
  {
    slug: "linux-commands-worth-knowing",
    title: "The Linux commands I reach for every single day",
    excerpt:
      "You don't need to memorise a thousand commands. You need a small, sharp set you actually understand. Here's the toolkit that covers most real situations.",
    date: "Feb 2026",
    iso: "2026-02-22",
    readTime: "6 min",
    category: "DevOps",
    tags: ["Linux", "DevOps", "CLI"],
    body: [
      { type: "p", text: "The terminal feels hostile until a handful of commands become muscle memory — then it feels like a superpower. You don't need to know everything. You need a small set you genuinely understand and can combine." },
      { type: "h2", text: "Finding things" },
      { type: "ul", items: [
        "grep — search inside files for text. The single most useful command for “where is this string?”",
        "find — locate files by name, size, or age across a tree.",
        "tail -f — watch a log file update live. You'll use this every time something's on fire.",
      ] },
      { type: "h2", text: "Understanding what's happening" },
      { type: "ul", items: [
        "ps and top / htop — what's running and what's eating your CPU and memory.",
        "df -h and du -sh — where did all my disk go? (Always the answer to a mysterious outage.)",
        "curl — make an HTTP request from the terminal to test an endpoint without a browser.",
      ] },
      { type: "h2", text: "Not getting locked out" },
      { type: "ul", items: [
        "chmod / chown — fix the permissions error you'll inevitably hit.",
        "ssh — get onto the remote machine in the first place.",
        "| (the pipe) — the real magic: send one command's output into another. grep something out of a log and count it in one line.",
      ] },
      { type: "quote", text: "Mastery on the command line isn't memorising commands — it's combining a few well-understood ones with a pipe." },
      { type: "p", text: "Learn these properly, lean on the pipe, and you'll handle the vast majority of day-to-day server work without reaching for Google." },
    ],
  },
  {
    slug: "what-happens-when-you-deploy",
    title: "From localhost to the world: what actually happens when you deploy",
    excerpt:
      "You run a command, a URL goes live, and the internet can suddenly reach your code. Here's the journey those bytes take — tying together DNS, load balancers and containers.",
    date: "Feb 2026",
    iso: "2026-02-06",
    readTime: "6 min",
    category: "DevOps",
    tags: ["DevOps", "Deployment", "Fundamentals"],
    body: [
      { type: "p", text: "“Deploying” feels like magic when you start: you push, you wait, a link works. Pulling back the curtain makes you a calmer engineer, because when something breaks you'll know which layer to poke." },
      { type: "h2", text: "1. Your code becomes a runnable artifact" },
      { type: "p", text: "First your app gets built and usually packed into a container image — that self-contained box of “app plus everything it needs.” This is what makes it run the same on the server as it did on your laptop." },
      { type: "h2", text: "2. It runs on a machine somewhere" },
      { type: "p", text: "That image is started as a container on a server (or several). At scale you don't run one — you run many identical copies behind a load balancer, so traffic spreads out and no single box melts under load." },
      { type: "h2", text: "3. The world learns your address" },
      { type: "p", text: "You point your domain at that infrastructure with a DNS record. Now when someone types your URL, the DNS chain resolves the name to an IP — typically the load balancer's — and remember, that answer gets cached for its TTL, which is why a fresh domain can take a little while to go live everywhere." },
      { type: "h2", text: "4. The connection completes" },
      { type: "p", text: "The browser opens a TCP connection, does a TLS handshake for HTTPS, sends an HTTP request, and your container responds. Static assets often come from a CDN edge near the user instead of your origin, so they load fast." },
      { type: "quote", text: "Deploy = artifact → running containers behind a load balancer → a DNS record pointing the name at them → TCP + TLS + HTTP, with a CDN for the static bits." },
      { type: "p", text: "Every one of those steps is a place things can break — and now you've got a map. That map is most of what “knowing DevOps” actually means early on." },
    ],
  },
];
