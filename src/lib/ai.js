export const generateBlog = async (params) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const { topic, tone, audience, keywords, wordCount } = params;
    const count = parseInt(wordCount) || 800;

    // Expanded fragments pool to prevent easy repetition
    const fragments = [
        `In the rapidly evolving landscape of ${topic}, practitioners are finding that dynamic approaches are no longer optional. For ${audience}, this means a fundamental shift in how they engage with core concepts. By leveraging keywords like ${keywords}, experts are able to carve out unique market positions while maintaining a ${tone} presence.`,
        `The integration of ${keywords} into daily workflows has shown a marked increase in efficiency. As we look towards 2026, the intersection of ${topic} and automated logic becomes even more critical. Many ${audience} members report that a ${tone} tone helps bridge the gap between technical complexity and user accessibility.`,
        `One of the most significant challenges in ${topic} is maintaining consistent quality while scaling. However, by focusing on ${keywords}, content creators can ensure that their message resonates with ${audience}. This strategy emphasizes a ${tone} approach to problem-solving, which is essential for long-term growth.`,
        `Diving deeper into the technicalities of ${topic}, we see that ${keywords} are the building blocks of modern infrastructure. For ${audience}, mastering these elements requires patience and a commitment to continuous learning. The ${tone} nature of this field means that what works today might be obsolete tomorrow, necessitating agility.`,
        `Statistical analysis of ${topic} trends indicates that ${keywords} are driving 40% of the innovation in the sector. This is a huge opportunity for ${audience} to lead the conversation. By adopting a ${tone} style, they can establish authority and influence stakeholders more effectively than ever before.`,
        `Looking at the global impact of ${topic}, it's clear that ${keywords} are playing a central role in digital transformation. For a target ${audience} specifically, understanding the nuances of ${tone} communication can be the difference between success and failure in a crowded market.`,
        `Research suggests that ${topic} is moving towards a more decentralized model, where ${keywords} serve as the primary verification layer. This shift empowers ${audience} to take control of their own data and assets, utilizing a ${tone} framework to ensure security and privacy.`,
        `The ethical implications of ${topic} are often overlooked, but focusing on ${keywords} can help highlight potential pitfalls. For ${audience}, it's important to approach these developments with a ${tone} mindset, ensuring that technology serves humanity rather than the other way around.`,
        `As ${topic} continues to mature, we are seeing the emergence of highly specialized tools built around ${keywords}. These innovations allow ${audience} to achieve results that were previously thought impossible. Maintaining a ${tone} standard of excellence is key to maximizing the benefits of these new technologies.`,
        `The community surrounding ${topic} is one of its greatest strengths, with ${keywords} providing a common language for collaboration. For ${audience} entering the space, finding mentors who value a ${tone} approach can significantly accelerate the learning curve and open up new opportunities.`
    ];

    // Dynamic headers pool
    const headers = [
        `Unlocking the Power of ${keywords}`,
        `Why ${topic} Matters Now`,
        `A Strategic Look at ${keywords}`,
        `Challenges for the Modern ${audience}`,
        `The Role of ${tone} Communication`,
        `Innovating with ${topic}`,
        `Mastering ${keywords} in 2026`,
        `Future Trends for ${audience}`
    ];

    // Shuffle function to ensure random order but no immediate repetition
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    // Construct content
    let dynamicContent = `<h2>Introduction</h2><p>Exploring ${topic} for ${audience} requires a deep understanding of its core principles. Today, we're diving into how ${keywords} impacts the industry with a ${tone} perspective.</p>`;

    // Calculate quantity
    const targetParagraphs = Math.max(1, Math.ceil((count - 100) / 50));

    // Create a shuffled deck of fragments
    let deck = shuffle([...fragments]);
    let headerDeck = shuffle([...headers]);
    let deckIndex = 0;
    let headerIndex = 0;

    for (let i = 0; i < targetParagraphs; i++) {
        // Add a header every 2-3 paragraphs
        if (i > 0 && i % 3 === 0) {
            if (headerIndex >= headerDeck.length) {
                headerDeck = shuffle([...headers]);
                headerIndex = 0;
            }
            dynamicContent += `<h2>${headerDeck[headerIndex++]}</h2>`;
        } else if (i > 0 && i % 3 === 1) {
            // Occasionally add h3
            dynamicContent += `<h3>Focusing on ${keywords.split(',')[0] || keywords}</h3>`;
        }

        // Reuse/Reshuffle deck if empty
        if (deckIndex >= deck.length) {
            deck = shuffle([...fragments]);
            deckIndex = 0;
        }

        dynamicContent += `<p>${deck[deckIndex++]}</p>`;
    }

    dynamicContent += `<h2>Final Thoughts</h2><p>In summary, the journey through ${topic} is constant. By keeping ${keywords} at the heart of your strategy and maintaining a ${tone} voice, you will successfully reach your ${audience}. This generated piece is approximately ${count} words long.</p>`;

    return {
        title: `The Ultimate Guide to ${topic}`,
        content: dynamicContent,
        metadata: {
            topic,
            tone,
            audience,
            keywords,
            wordCount: count,
            generatedAt: new Date().toISOString()
        }
    };
};
