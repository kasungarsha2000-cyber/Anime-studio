export const POST_TYPES = [
  {
    id: 'choose_one',
    title: 'Choose One Post',
    description: 'Forces followers to pick one option. Drives high comment volume and "defend your choice" energy.',
    icon: '🎯',
    engagement_goal: 'Massive Comments',
    when_to_use: 'When you want to boost algorithm visibility quickly.',
    fields: [
      { id: 'numChoices', label: 'Number of Choices', type: 'number', default: 4 },
      { id: 'choiceType', label: 'Choice Type', type: 'select', options: ['characters', 'powers', 'anime worlds', 'teams', 'arcs'] },
      { id: 'mixSeries', label: 'Mix Series?', type: 'select', options: ['Same series', 'Mixed series'] },
      { id: 'difficulty', label: 'Difficulty', type: 'select', options: ['Easy choice', 'Hard choice'] },
      { id: 'tone', label: 'Tone', type: 'select', options: ['Emotional', 'Funny', 'Serious'] },
      { id: 'includeDefendCTA', label: 'Include "Defend your choice" CTA', type: 'checkbox', default: true }
    ]
  },
  {
    id: 'versus_battle',
    title: 'Versus Battle Post',
    description: 'Classic comparison between two entities. Sparks passionate debates and long comment threads.',
    icon: '⚔️',
    engagement_goal: 'Debate & Shares',
    when_to_use: 'When two popular shows or characters are trending.',
    fields: [
      { id: 'fighterA', label: 'Fighter A', type: 'text', placeholder: 'e.g. Gojo' },
      { id: 'fighterB', label: 'Fighter B', type: 'text', placeholder: 'e.g. Kakashi' },
      { id: 'comparisonBasis', label: 'Comparison Basis', type: 'select', options: ['Strength', 'IQ', 'Speed', 'Popularity', 'Writers Choice', 'Drip'] },
      { id: 'debateStyle', label: 'Debate Style', type: 'select', options: ['Serious debate', 'Fun debate'] },
      { id: 'provocative', label: 'Tone', type: 'select', options: ['Neutral wording', 'Slightly provocative'] },
      { id: 'winnerRevealed', label: 'Result Type', type: 'select', options: ['Winner hidden', 'Open-ended question'] },
      { id: 'layout', label: 'Image Layout', type: 'select', options: ['Split screen', 'Clash poster', 'Stat card'] }
    ]
  },
  {
    id: 'anime_meme',
    title: 'Relatable Meme',
    description: 'Humor focused on the anime fan lifestyle. Highly shareable and tags friends.',
    icon: '😂',
    engagement_goal: 'Shares & Tags',
    when_to_use: 'To humanize your brand and increase community reach.',
    fields: [
      { id: 'memeTheme', label: 'Meme Theme', type: 'select', options: ['School/Exams', 'Sleep/Rest', 'Friendship', 'Anime Addiction', 'Being Broke', 'Binge Watching'] },
      { id: 'humorLevel', label: 'Humor Style', type: 'select', options: ['Sarcastic', 'Wholesome', 'Relatable/Pain', 'Absurd'] },
      { id: 'density', label: 'Content Density', type: 'select', options: ['Text-heavy', 'Image-heavy'] },
      { id: 'reactionStyle', label: 'Reaction Face Style', type: 'text', placeholder: 'e.g. Shocked Anya, Crying Aqua' }
    ]
  },
  {
    id: 'guess_the_anime',
    title: 'Guess the Anime',
    description: 'A challenge for the real otakus. High interactions through incorrect/correct guesses.',
    icon: '❓',
    engagement_goal: 'High Interactions',
    when_to_use: 'To reward your most loyal and knowledgeable fans.',
    fields: [
      { id: 'clueType', label: 'Clue Type', type: 'select', options: ['Silhouette', 'Cropped Scene', 'Famous Quote', 'Key Item', 'Eye Close-up', 'Background only'] },
      { id: 'difficulty', label: 'Difficulty', type: 'select', options: ['Beginner', 'Otaku', 'God Tier'] },
      { id: 'includeHint', label: 'Include Hint?', type: 'checkbox', default: false },
      { id: 'hintText', label: 'Hint Text', type: 'text', condition: 'includeHint' },
      { id: 'revealComments', label: 'Reveal in comments?', type: 'checkbox', default: true },
      { id: 'era', label: 'Anime Era', type: 'select', options: ['Nostalgic (90s/00s)', 'Current Seasonal', 'Modern Classics'] }
    ]
  },
  {
    id: 'ranking_post',
    title: 'Top 5/10 Ranking',
    description: 'Opinionated lists that force users to comment their own corrections.',
    icon: '📊',
    engagement_goal: 'Long Comments',
    when_to_use: 'When a new season ends or a major arc concludes.',
    fields: [
      { id: 'rankSize', label: 'Ranking Size', type: 'select', options: ['Top 5', 'Top 10'] },
      { id: 'rankTopic', label: 'Ranking Topic', type: 'select', options: ['Strongest', 'Saddest', 'Smartest', 'Best Villains', 'Best Openings'] },
      { id: 'rankBasis', label: 'Basis', type: 'select', options: ['Objective Stats', 'Pure Opinion'] },
      { id: 'vibe', label: 'Vibe', type: 'select', options: ['Serious/Analytic', 'Fan-War Style'] },
      { id: 'askUserRank', label: 'Ask audience for their rank?', type: 'checkbox', default: true }
    ]
  },
  {
    id: 'waifu_husbando',
    title: 'Waifu/Husbando Discussion',
    description: 'Appreciation for fan-favorite characters. High reaction counts and "stan" energy.',
    icon: '💖',
    engagement_goal: 'Reactions & Tags',
    when_to_use: 'When a popular character has a birthday or big moment.',
    fields: [
      { id: 'subjectType', label: 'Focus', type: 'select', options: ['Waifu', 'Husbando', 'Both'] },
      { id: 'scope', label: 'Scope', type: 'select', options: ['Anime-specific', 'Mixed fandom'] },
      { id: 'vibe', label: 'Tone', type: 'select', options: ['Wholesome', 'Funny', 'Debate'] },
      { id: 'characterEra', label: 'Characters', type: 'select', options: ['Classic/OG', 'Trending/Seasonal'] },
      { id: 'format', label: 'Format', type: 'select', options: ['One Winner', 'Tier List Style', 'Collage Appreciation'] }
    ]
  },
  {
    id: 'this_or_that',
    title: 'This or That',
    description: 'Binary choices for low-friction engagement. Fast decisions, high reach.',
    icon: '⚖️',
    engagement_goal: 'Fast Reach',
    when_to_use: 'Daily "filler" content to keep your page active.',
    fields: [
      { id: 'optionA', label: 'Option A', type: 'text' },
      { id: 'optionB', label: 'Option B', type: 'text' },
      { id: 'compType', label: 'Comparison Type', type: 'select', options: ['Characters', 'Arcs', 'Outfits', 'Openings', 'Art Styles', 'Worlds'] },
      { id: 'explainRequest', label: 'Request explanation?', type: 'select', options: ['Instant choice', 'Explain why in comments'] },
      { id: 'visualStyle', label: 'Visual Style', type: 'select', options: ['Minimal text', 'Bold headline'] }
    ]
  },
  {
    id: 'anime_quote',
    title: 'Anime Quote',
    description: 'Emotional or motivational quotes. High save rates and aesthetic shares.',
    icon: '💬',
    engagement_goal: 'Saves & Shares',
    when_to_use: 'On weekends or during emotional series finales.',
    fields: [
      { id: 'mood', label: 'Quote Mood', type: 'select', options: ['Emotional', 'Motivational', 'Sad', 'Dark', 'Nostalgic'] },
      { id: 'style', label: 'Quote Style', type: 'select', options: ['Real Quote Inspired', 'Original Fan-style line'] },
      { id: 'credit', label: 'Show Character Name?', type: 'checkbox', default: true },
      { id: 'typography', label: 'Typography Style', type: 'select', options: ['Elegant Serif', 'Bold Sans', 'Handwritten Manga'] }
    ]
  },
  {
    id: 'recommendation',
    title: 'Recommendation Request',
    description: 'Crowdsourcing anime suggestions. Builds deep community trust and helpfulness.',
    icon: '📺',
    engagement_goal: 'Community Trust',
    when_to_use: 'When the season is slow or looking for new niche titles.',
    fields: [
      { id: 'recTheme', label: 'Theme', type: 'select', options: ['Sad', 'Action', 'Romance', 'Short Anime', 'Underrated', 'Dark', 'Wholesome'] },
      { id: 'audienceTier', label: 'Audience Tier', type: 'select', options: ['Beginner-friendly', 'Hardcore Otaku Only'] },
      { id: 'depth', label: 'Quantity', type: 'select', options: ['One deep recommendation', 'Many quick titles'] },
      { id: 'questionStyle', label: 'Style', type: 'select', options: ['"Recommend one"', '"Best for this mood"'] }
    ]
  },
  {
    id: 'hot_take',
    title: 'Hot Take / Opinion',
    description: 'Controversy (the safe kind) that generates long, defending/attacking comments.',
    icon: '🔥',
    engagement_goal: 'Viral Conversations',
    when_to_use: 'To trigger the algorithm with high-velocity commenting.',
    fields: [
      { id: 'controversy', label: 'Controversy Level', type: 'select', options: ['Mild/Safe', 'Medium/Provocative'] },
      { id: 'topicCategory', label: 'Category', type: 'select', options: ['Overrated', 'Underrated', 'Best Arc', 'Bad Ending', 'Wasted Character'] },
      { id: 'format', label: 'Format', type: 'select', options: ['Strong Statement', 'Provocative Question'] },
      { id: 'defense', label: 'Include "Don\'t hate me" tone?', type: 'checkbox', default: true }
    ]
  }
];

export const ART_STYLES = [
  'Anime Poster Style', 'Manga Panel Style', 'Cinematic Anime Style', 'Neon Edit Style', 'Minimalist Social Card', 
  'Chibi Style', 'Dark Dramatic Style', 'Soft Pastel Anime Style', 'Retro 90s Anime Style', 'Glossy Modern Anime Promo'
];

export const VISUAL_FINISHES = [
  'High Contrast', 'Soft Glow', 'Dramatic Shadows', 'Colorful Vibrant', 'Monochrome Manga', 'Clean Flat Design'
];

export const TEXT_OVERLAY_OPTIONS = [
  'Bold Facebook Headline', 'No text on image', 'Small label only', 'Debate Banner', 'Ranking Title', 'Quote Typography'
];

export const STRATEGIC_GOALS = [
  { id: 'comments', label: 'Get More Comments', sub: 'Target: Engagement & Debate' },
  { id: 'shares', label: 'Get More Shares', sub: 'Target: Reach & Relatability' },
  { id: 'reactions', label: 'Get More Reactions', sub: 'Target: Social Proof' },
  { id: 'followers', label: 'Get More Followers', sub: 'Target: Page Growth' },
  { id: 'saves', label: 'Get More Saves', sub: 'Target: Value & Recall' }
];

export const PRESETS = [
  {
    id: 'viral_debate',
    label: 'Viral Debate Pack',
    config: { goal: 'comments', tone: 'Provocative', artStyle: 'Neon Edit Style', textOverlay: 'Debate Banner' }
  },
  {
    id: 'meme_page',
    label: 'Meme Page Pack',
    config: { goal: 'shares', tone: 'Funny', artStyle: 'Manga Panel Style', textOverlay: 'No text on image' }
  },
  {
    id: 'sad_anime',
    label: 'Sad Anime Pack',
    config: { goal: 'saves', tone: 'Emotional', artStyle: 'Dark Dramatic Style', textOverlay: 'Quote Typography' }
  },
  {
    id: 'waifu_war',
    label: 'Waifu War Pack',
    config: { goal: 'comments', tone: 'Hype', artStyle: 'Glossy Modern Anime Promo', textOverlay: 'Bold Facebook Headline' }
  }
];

export const AUDIENCES = [
  'General Anime Fans', 'Shonen Fans', 'Seinen Fans', 'Shojo/Romance Fans', 'Hardcore Otakus', 'Newbies/Entry-level'
];

export const LANGUAGES = ['English', 'Spanish', 'French', 'Japanese', 'Hindi', 'Portuguese'];

export const DEFAULT_SETTINGS = {
  animeName: '',
  audience: 'General Anime Fans',
  platform: 'Facebook',
  language: 'English',
  captionVariations: 3,
  hashtagCount: 12,
  includeCTA: true,
  goal: 'comments',
  artStyle: 'Anime Poster Style',
  visualFinish: 'Colorful Vibrant',
  textOverlay: 'Bold Facebook Headline',
  includeFirstComment: true,
  includeImagePrompt: true
};
export const VIRAL_IDEAS = [
  {
    id: 'only_real_fans',
    title: 'Only real fans remember this scene',
    description: 'Nostalgia bait targeting OG fans with iconic, deep-cut moments.',
    mapped_type: 'guess_the_anime',
    category: 'nostalgic',
    goal: 'saves',
    config: { goal: 'saves', clueType: 'Cropped Scene', difficulty: 'Otaku', tone: 'Nostalgic', includeHint: true, era: 'Nostalgic (90s/00s)' }
  },
  {
    id: 'anime_crush',
    title: 'Drop your anime crush',
    description: 'High-reaction post encouraging fans to share their favorites.',
    mapped_type: 'waifu_husbando',
    category: 'fandom',
    goal: 'reactions',
    config: { goal: 'reactions', subjectType: 'Both', scope: 'Mixed fandom', vibe: 'Wholesome', characterEra: 'Trending/Seasonal', format: 'Collage Appreciation' }
  },
  {
    id: 'best_glowup',
    title: 'Which anime had the best glow-up?',
    description: 'Visual comparison of art style evolution or character growth.',
    mapped_type: 'versus_battle',
    category: 'comments',
    goal: 'comments',
    config: { goal: 'comments', comparisonBasis: 'Popularity', debateStyle: 'Fun debate', provocative: 'Neutral wording', layout: 'Stat card' }
  },
  {
    id: 'watch_before_die',
    title: 'Anime to watch before you die',
    description: 'Authority-building recommendation post for essential titles.',
    mapped_type: 'recommendation',
    category: 'recommendation',
    goal: 'shares',
    config: { goal: 'saves', recTheme: 'Modern Classics', audienceTier: 'Beginner-friendly', depth: 'Many quick titles', questionStyle: '"Best for this mood"' }
  },
  {
    id: 'broke_heart',
    title: 'What anime broke your heart?',
    description: 'Emotional trigger post driving deep community connection.',
    mapped_type: 'anime_quote',
    category: 'emotional',
    goal: 'reactions',
    config: { goal: 'reactions', mood: 'Sad', style: 'Real Quote Inspired', credit: true, typography: 'Elegant Serif' }
  },
  {
    id: 'villain_right',
    title: 'Which villain was actually right?',
    description: 'Controversial debate-starter about moral ambiguity.',
    mapped_type: 'hot_take',
    category: 'debate',
    goal: 'comments',
    config: { goal: 'comments', controversy: 'Medium/Provocative', topicCategory: 'Best Villains', format: 'Provocative Question', defense: true }
  },
  {
    id: 'best_transformation',
    title: 'Best transformation of all time?',
    description: 'Classic hype post celebrating peak animation moments.',
    mapped_type: 'this_or_that',
    category: 'comments',
    goal: 'comments',
    config: { goal: 'comments', compType: 'Art Styles', explainRequest: 'Explain why in comments', visualStyle: 'Bold headline' }
  },
  {
    id: 'unskipped_opening',
    title: 'Unskipped anime openings',
    description: 'Music-focused engagement post that triggers nostalgia.',
    mapped_type: 'ranking_post',
    category: 'nostalgic',
    goal: 'comments',
    config: { goal: 'comments', rankSize: 'Top 10', rankTopic: 'Best Openings', rankBasis: 'Pure Opinion', vibe: 'Fan-War Style', askUserRank: true }
  },
  {
    id: 'better_ending',
    title: 'Deserved a better ending',
    description: 'Empathy-driven post about wasted potential or sad finales.',
    mapped_type: 'hot_take',
    category: 'debate',
    goal: 'comments',
    config: { goal: 'comments', controversy: 'Mild/Safe', topicCategory: 'Bad Ending', format: 'Strong Statement', defense: false }
  },
  {
    id: 'dream_team',
    title: 'Build your dream anime team',
    description: 'Interactive gamified post allowing fans to "build" a squad.',
    mapped_type: 'choose_one',
    category: 'fandom',
    goal: 'comments',
    config: { goal: 'comments', numChoices: 5, choiceType: 'teams', mixSeries: 'Mixed series', difficulty: 'Hard choice', includeDefendCTA: true }
  },
  {
    id: 'overrated_power',
    title: 'Most overrated anime power?',
    description: 'Power-scaling debate that challenges popular opinions.',
    mapped_type: 'hot_take',
    category: 'debate',
    goal: 'comments',
    config: { goal: 'comments', controversy: 'Medium/Provocative', topicCategory: 'Overrated', format: 'Provocative Question', defense: true }
  },
  {
    id: 'side_character_steal',
    title: 'Side character stole the show',
    description: 'Appreciation post for underrated MVPs of popular series.',
    mapped_type: 'hot_take',
    category: 'comments',
    goal: 'comments',
    config: { goal: 'comments', controversy: 'Mild/Safe', topicCategory: 'Underrated', format: 'Strong Statement', defense: true }
  },
  {
    id: 'choose_mentor',
    title: 'Choose your anime mentor',
    description: 'High-engagement binary choice post.',
    mapped_type: 'choose_one',
    category: 'fandom',
    goal: 'comments',
    config: { goal: 'comments', numChoices: 4, choiceType: 'characters', mixSeries: 'Mixed series', difficulty: 'Hard choice', includeDefendCTA: true }
  },
  {
    id: 'anime_world_live',
    title: 'Live in this world for one week',
    description: 'Isekai-themed imagination post.',
    mapped_type: 'choose_one',
    category: 'fandom',
    goal: 'comments',
    config: { goal: 'comments', numChoices: 4, choiceType: 'anime worlds', mixSeries: 'Mixed series', difficulty: 'Easy choice', includeDefendCTA: true }
  },
  {
    id: 'best_friendship',
    title: 'Best anime friendship ever?',
    description: 'Wholesome post celebrating iconic duos.',
    mapped_type: 'recommendation',
    category: 'emotional',
    goal: 'shares',
    config: { goal: 'shares', recTheme: 'Wholesome', audienceTier: 'Beginner-friendly', depth: 'One deep recommendation', questionStyle: '"Best for this mood"' }
  },
  {
    id: 'zero_bad_episodes',
    title: 'What anime has zero bad episodes?',
    description: 'Quality-focused recommendation bait.',
    mapped_type: 'recommendation',
    category: 'recommendation',
    goal: 'comments',
    config: { goal: 'comments', recTheme: 'Underrated', audienceTier: 'Hardcore Otaku Only', depth: 'Many quick titles', questionStyle: '"Recommend one"' }
  },
  {
    id: 'worst_roommate',
    title: 'Worst anime roommate?',
    description: 'Funny hypothetical question driving tags and humor.',
    mapped_type: 'hot_take',
    category: 'funny',
    goal: 'comments',
    config: { goal: 'comments', controversy: 'Mild/Safe', topicCategory: 'Underrated', format: 'Provocative Question', defense: false }
  },
  {
    id: 'opinion_get_you_like_this',
    title: 'Opinion that gets you this reaction',
    description: 'Ultimate debate bait using the "surrounded by swords" meme energy.',
    mapped_type: 'hot_take',
    category: 'debate',
    goal: 'comments',
    config: { goal: 'comments', controversy: 'Medium/Provocative', topicCategory: 'Overrated', format: 'Strong Statement', defense: false }
  },
  {
    id: 'best_scene_type',
    title: 'Best laugh / cry / rage scene?',
    description: 'Focusing on peak voice acting or emotional animation.',
    mapped_type: 'ranking_post',
    category: 'emotional',
    goal: 'comments',
    config: { goal: 'comments', rankSize: 'Top 5', rankTopic: 'Saddest', rankBasis: 'Pure Opinion', vibe: 'Serious/Analytic', askUserRank: true }
  },
  {
    id: 'erase_death',
    title: 'Erase one anime death',
    description: 'Maximum emotional reach post about fan-favorite loses.',
    mapped_type: 'hot_take',
    category: 'emotional',
    goal: 'shares',
    config: { goal: 'shares', controversy: 'Mild/Safe', topicCategory: 'Saddest', format: 'Provocative Question', defense: true }
  }
];
