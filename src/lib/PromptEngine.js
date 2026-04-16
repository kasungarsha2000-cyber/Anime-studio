import { POST_TYPES } from './constants';

export function generateGeminiPrompt(formData) {
  const {
    postTypeId,
    goal,
    artStyle,
    visualFinish,
    textOverlay,
    platform,
    language,
    audience,
    animeName,
    captionVariations,
    hashtagCount,
    includeCTA,
    tone
  } = formData;

  const postType = POST_TYPES.find(p => p.id === postTypeId) || {};
  
  // Post-type specific content settings
  const content_settings = getSpecificContentSettings(postTypeId, formData);
  
  // Standard instructions
  const instructions = [
    "Create highly engaging copy-paste-ready content.",
    "Make the captions easy to comment on.",
    "Keep the tone consistent with the 'tone' field.",
    "Ensure the output language is strictly " + language + ".",
    "Return structured output sections (Captions, Hashtags, Image Brief, First Comment) clearly."
  ];

  // Construct the structured JSON prompt
  const structuredPrompt = {
    role: "anime_facebook_content_creator",
    goal: goal === 'comments' ? "increase comments and debate" : "increase shares and reach",
    post_type: postTypeId,
    topic: animeName || "Popular Anime Franchise",
    audience: audience,
    tone: tone || "engaging and punchy",
    platform: platform,
    
    // Optional Preset Metadata
    ...(formData.presetName && {
      preset_context: {
        name: formData.presetName,
        goal_intent: formData.presetGoal,
        mapped_to: formData.mappedType,
        base_topic: formData.topicSeed
      }
    }),

    content_settings: content_settings,
    image_style: {
      art_style: artStyle,
      finish: visualFinish,
      text_overlay: textOverlay
    },
    engagement_strategy: getEngagementStrategy(goal),
    output_requirements: {
      caption_options: parseInt(captionVariations) || 3,
      hashtag_count: parseInt(hashtagCount) || 12,
      include_cta: includeCTA,
      include_first_comment: formData.includeFirstComment ?? true,
      include_image_prompt: formData.includeImagePrompt ?? true
    },
    instructions: instructions
  };

  // Return the stringified JSON with formatting
  return JSON.stringify(structuredPrompt, null, 2);
}

function getSpecificContentSettings(typeId, data) {
  switch (typeId) {
    case 'choose_one':
      return {
        num_choices: data.numChoices,
        choice_type: data.choiceType,
        mix_series: data.mixSeries,
        difficulty: data.difficulty,
        include_defend_cta: data.includeDefendCTA
      };
    case 'versus_battle':
      return {
        fighter_a: data.fighterA,
        fighter_b: data.fighterB,
        comparison_basis: data.comparisonBasis,
        debate_style: data.debateStyle,
        tone_intensity: data.provocative
      };
    case 'anime_meme':
      return {
        theme: data.memeTheme,
        humor_style: data.humorLevel,
        content_density: data.density,
        reaction_style: data.reactionStyle
      };
    case 'guess_the_anime':
      return {
        clue_type: data.clueType,
        difficulty: data.difficulty,
        include_hint: data.includeHint,
        hint_text: data.hintText,
        era: data.era
      };
    case 'ranking_post':
      return {
        rank_size: data.rankSize,
        topic: data.rankTopic,
        basis: data.rankBasis,
        vibe: data.vibe,
        ask_user_rank: data.askUserRank
      };
    case 'waifu_husbando':
      return {
        subject: data.subjectType,
        scope: data.scope,
        tone: data.vibe,
        character_era: data.characterEra,
        format: data.format
      };
    case 'this_or_that':
      return {
        option_a: data.optionA,
        option_b: data.optionB,
        comparison_type: data.compType,
        explain_request: data.explainRequest,
        visual_style: data.visualStyle
      };
    case 'anime_quote':
      return {
        mood: data.mood,
        style: data.style,
        show_name: data.credit,
        typography: data.typography
      };
    case 'recommendation':
      return {
        theme: data.recTheme,
        audience_tier: data.audienceTier,
        quantity: data.depth,
        style: data.questionStyle
      };
    case 'hot_take':
      return {
        level: data.controversy,
        category: data.topicCategory,
        format: data.format,
        safe_tone: data.defense
      };
    default:
      return {
        category: "General Anime Content"
      };
  }
}

function getEngagementStrategy(goal) {
  switch (goal) {
    case 'comments': return 'Triggering high comment volume through polarized choices or complex opinion-based questions that require defense.';
    case 'shares': return 'Maximizing shareability by tapping into universal anime fan relatability, niche humor, or deep emotional "vibe" moments.';
    case 'reactions': return 'Eliciting strong emotional reactions using stunning cinematic visuals, nostalgic triggers, or high-hype character revelations.';
    case 'followers': return 'Hooking new users by showcasing the page as a premium authoritative hub for anime news and community discussion.';
    case 'saves': return 'Providing high-value reference content that fans will want to archive.';
    default: return 'Increasing overall page interactions through visual and textual hooks.';
  }
}
