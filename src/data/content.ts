export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface GuideItem {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  keyTakeaways: string[];
  coverImage: string;
  category: string;
  publishedAt: string;
  readTime: string;
  faqs: { question: string; answer: string }[];
}

export interface RecipeItem {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: "Easy" | "Medium" | "Gourmet";
  calories: string;
  ingredients: string[];
  instructions: string[];
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-10-health-benefits-of-daily-soaked-almonds",
    title: "10 Proven Health Benefits of Eating Soaked Almonds Every Morning",
    excerpt:
      "Why soaking almonds overnight releases lipase enzyme inhibitors and maximizes nutrient absorption for cardiovascular and brain health.",
    content:
      "Soaking almonds overnight in clean drinking water removes the brown peel containing tannin and phytic acid, which otherwise restrict nutrient absorption. Soaked almonds are significantly easier to digest, rich in alpha-tocopherol (Vitamin E), and help balance blood sugar and lipid profiles.",
    coverImage: "https://placehold.co/800x450/F5F1E6/285542?text=Soaked+Almonds+Guide",
    category: "Nutrition & Health",
    publishedAt: "2026-02-10",
    readTime: "5 min read",
    author: "Dr. Ananya Roy, Clinical Nutritionist",
    tags: ["almonds", "wellness", "soaked-nuts", "cardiovascular"],
  },
  {
    slug: "difference-between-california-and-mamra-almonds",
    title: "California vs Mamra Almonds: Origin, Nutrition, Oil Content & Taste",
    excerpt:
      "Unravel the mystery of Mamra almonds versus California Nonpareil almonds. Find out which almond variety suits your lifestyle.",
    content:
      "While California Nonpareil almonds are globally renowned for their uniform size, mild crunch, and versatility in snacking, Mamra badam from Iran and Afghanistan contain up to 50% natural oil content and zero pasteurization processing.",
    coverImage: "https://placehold.co/800x450/F5F1E6/285542?text=Mamra+vs+California",
    category: "Buying Guides",
    publishedAt: "2026-03-01",
    readTime: "7 min read",
    author: "Nutz N Fruitz Sourcing Team",
    tags: ["badam", "mamra", "california", "origin"],
  },
  {
    slug: "why-kashmiri-saffron-is-the-worlds-most-prized-spice",
    title: "The Golden Harvest: Why Kashmiri Saffron (Lacha & Mongra) Outclasses All Others",
    excerpt:
      "Explore the unique climatic conditions of Pampore Kashmir that create the highest crocin, picrocrocin, and safranal levels in authentic Kashmiri saffron.",
    content:
      "Pampore's high-altitude soil produces saffron threads with thick, dark red stigmas. Kashmiri Mongra saffron features deep coloring strength (over 250 USP units) without any artificial dyes or added weight.",
    coverImage: "https://placehold.co/800x450/3D2B1A/D4AF37?text=Kashmiri+Saffron",
    category: "Spice Heritage",
    publishedAt: "2026-03-14",
    readTime: "6 min read",
    author: "Farooq Ahmed, Master Agronomist",
    tags: ["saffron", "kashmir", "mongra", "spices"],
  },
];

export const BUYING_GUIDES: GuideItem[] = [
  {
    slug: "how-to-store-dry-fruits-in-indian-weather",
    title: "The Ultimate Dry Fruit Storage Guide for Indian Climates",
    subtitle: "Prevent moisture damage, rancidity, and preserve crispness for up to 12 months.",
    overview:
      "Due to high ambient humidity during monsoons and summer heat across Indian cities, raw nuts containing high unsaturated fatty acids require specialized airtight and refrigerated storage routines.",
    keyTakeaways: [
      "Always transfer vacuum pouches into airtight food-grade glass jars after breaking the vacuum seal.",
      "Store raw walnuts, pine nuts, and mamra almonds in the refrigerator (below 10°C) to prevent lipid oxidation.",
      "Never store spices and pungent items next to dates or dried apricots as they absorb volatile aromas.",
    ],
    coverImage: "https://placehold.co/800x450/F5F1E6/285542?text=Storage+Guide",
    category: "Pantry Masterclass",
    publishedAt: "2026-01-20",
    readTime: "4 min read",
    faqs: [
      {
        question: "Can I freeze raw walnuts and cashews?",
        answer: "Yes! Freezing in airtight zip-seal bags extends walnut freshness up to 2 years without altering texture.",
      },
      {
        question: "How do I know if nuts have gone bad?",
        answer: "Rancid nuts exhibit a paint-like sour smell, bitter aftertaste, and a rubbery texture instead of a sharp crunch.",
      },
    ],
  },
  {
    slug: "cashew-grading-guide-w180-to-w320-explained",
    title: "Understanding Cashew Grades: What Do W180, W240 & W320 Mean?",
    subtitle: "A straightforward guide to kernel counts, jumbo sizing, and grade classifications.",
    overview:
      "The 'W' stands for 'White Whole' cashews. The number indicates how many kernels are present per pound (453.59g). Lower numbers mean significantly larger, jumbo king-size cashew nuts.",
    keyTakeaways: [
      "W180 are known as the 'King of Cashews' (180 pieces per pound) and are the largest commercially available size.",
      "W240 are jumbo party grade, ideal for luxury gifting and roasting.",
      "W320 are the global standard grade offering the optimum balance of size, crunch, and value.",
    ],
    coverImage: "https://placehold.co/800x450/F5F1E6/285542?text=Cashew+Grades",
    category: "Product Grading",
    publishedAt: "2026-02-15",
    readTime: "5 min read",
    faqs: [
      {
        question: "Does a larger cashew size mean higher nutrition?",
        answer: "All whole white cashews share identical nutritional and protein profiles; the difference lies in kernel caliber and crunch.",
      },
    ],
  },
];

export const RECIPES: RecipeItem[] = [
  {
    slug: "kashmiri-shahi-kahwa-tea",
    title: "Authentic Kashmiri Shahi Kahwa with Saffron & Slivered Almonds",
    description:
      "A fragrant, soul-soothing green tea infusion brewed with pure Kashmiri saffron strands, green cardamom pods, cinnamon bark, and topped with crunchy slivered almonds.",
    coverImage: "https://placehold.co/800x450/3D2B1A/D4AF37?text=Kashmiri+Kahwa",
    prepTime: "PT5M",
    cookTime: "PT10M",
    servings: "4 Cups",
    difficulty: "Easy",
    calories: "65 kcal",
    category: "Beverages",
    ingredients: [
      "4 cups pure mountain spring water",
      "2 tsp Kashmiri Green Tea leaves",
      "8-10 pure Kashmiri Saffron threads (crushed)",
      "3 Green Cardamom pods (lightly bruised)",
      "1 inch Cinnamon stick",
      "2 tbsp Raw Honey or rock sugar",
      "2 tbsp Nutz N Fruitz California Almonds (thinly slivered)",
    ],
    instructions: [
      "Bring 4 cups of water to a gentle boil with crushed cardamom and cinnamon stick in a brass or stainless steel pan for 3 minutes.",
      "Reduce heat, stir in the Kashmiri green tea leaves, and simmer gently for 2 minutes without over-boiling.",
      "Add the crushed saffron strands and honey. Cover with a lid and let steep for 1 minute.",
      "Strain into traditional glass or ceramic cups, garnish generously with slivered almonds, and serve piping hot.",
    ],
  },
  {
    slug: "sugar-free-dry-fruit-energy-laddoo",
    title: "No-Sugar Dry Fruit & Royal Medjool Date Energy Laddoos",
    description:
      "Guilt-free, power-packed artisan energy bites made purely with chopped dates, California almonds, cashews, pistachios, and roasted seeds without any refined sugar.",
    coverImage: "https://placehold.co/800x450/F5F1E6/285542?text=Energy+Laddoo",
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: "12 Laddoos",
    difficulty: "Easy",
    calories: "140 kcal / piece",
    category: "Healthy Treats",
    ingredients: [
      "250g Royal Jordanian Medjool Dates (pitted & finely chopped)",
      "50g California Almonds (coarsely chopped)",
      "50g Jumbo Cashews (coarsely chopped)",
      "40g Iranian Pistachios (chopped)",
      "2 tbsp A2 Desi Cow Ghee",
      "1/2 tsp freshly ground Green Cardamom powder",
      "1 tbsp Poppy seeds / Khus Khus (for rolling)",
    ],
    instructions: [
      "Heat 1 tbsp ghee in a non-stick pan, lightly roast chopped almonds, cashews, and pistachios for 3 minutes until golden and aromatic. Set aside.",
      "In the same pan, heat the remaining 1 tbsp ghee, add chopped Medjool dates, and cook on low flame for 4-5 minutes until the dates soften into a cohesive paste.",
      "Add roasted nuts and green cardamom powder into the softened dates. Mix vigorously until thoroughly combined.",
      "Allow to cool slightly until safe to touch. Shape into 12 round balls and roll each ball lightly in toasted poppy seeds.",
      "Store in an airtight container for up to 3 weeks.",
    ],
  },
];
