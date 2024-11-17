---
title: "Philosophical thoughts about Creativity and AI"
date: 2024-10-27
---

"Art is a mechanism that is always trying to destroy itself, always questioning what is or not is art"


Those were the words that my uncle, the artist Pipo Hernandez, told me in a burger in Madrid when we were discussing if an AI could be an artist.

(You can check his work [here](https://nfgaleria.com/artista/pipo-hernandez-rivero/) if you like. I personally love it!)

Some months later I delivered my Master's thesis called "Alien Recombination: Exploring Concept Blends Beyond Human Cognitive Availability" at the Technical University of Munich. I had the privilege of carrying out this research along a fantastic team of researchers from the Max Planck Institute for Human Development and the Max Planck Institute for Intelligent Systems.

In this project we thought about ways to make machines more creative. This is a very ambitious goal to be honest, a master's thesis is not enough to tackle this problem in full depth, mostly because we do not know exactly where the problem ends.

In this post, I will write about the nature of creativity and the problems of implementing it in a machine, as well as ways we could improve it. Note that this is not a scientific article, nor does it pretend to be. It is an exercise to verbalize my thoughts and to foster dialogue and new ideas about this topic I find so fascinating.

To-do:
- Boden creativity
- Remember and imagination as reconstruction
- Our thesis and our hypothesis
- Creative reasoning is very difficult to track, but it could composed of multiple transformations in an multidimensional space
- Open-endedness

## What is creativity?

Creativity is a difficult concept to grasp. Some view it as a process that emerges from imagination [1], where imagination is seen as a reconstructive process based on prior knowledge [2]. Others define it as the process by which an individual generates new ideas or patterns using the symbols of a given domain [3]. Additionally, some interpretations view creativity as a fully combinatorial process, involving the combination of existing representations [4][5]. 

In computer science, one of the most influential definitions of creativity comes from Margaret Boden [6], who describes it as "the ability to come up with ideas or artifacts that are new, surprising, and valuable." [7] This definition is particularly useful because it breaks creativity into somewhat measurable components: valuable, meaning the output is of high quality and socially accepted; novel, meaning the artifact is significantly different from others in its class; and surprising, meaning the result deviates from expectations.

Boden identifies three types of creativity:

• Combinatorial creativity: This involves making unfamiliar combinations of familiar ideas. An example of this is creating a new recipe by pairing unexpected ingredients, such as chocolate and chili.

• Exploratory creativity: This focuses on finding new solutions within an existing style or set of rules, like a jazz musician improvising a melody while adhering to standard chord progressions.

• Transformational creativity: This involves completely changing the current way of thinking. A classic example is Einstein's theory of relativity, which revolutionized our understanding of space and time, or Picasso's cubist paintings, which redefined artistic expression and deeply transformed 20th-century art.

-add vanesh theory of creativity

## Unexplored combinations

Combinatorial creativity is often considered the most basic form of creativity. While some studies suggest that LLMs are primarily limited to this type of creativity, lacking the deeper exploratory or transformative capabilities found in other forms [8], we shouldn't undervalue the power of combining different concepts.

In fact, the combination of concepts is a phenomenally powerful mechanism for creating wonderful things. Most of the creative works we love are, to a large degree, combinations of concepts we already know. Think about Star Wars for example. George Lucas created it by mixing westerns, samurai stories, feudal societies, and Flash Gordon, among other influences. Or consider Rapture, the charismatic city from Bioshock, it's basically a combination of a submarine city, art deco architecture, Ayn Rand's ultra-liberal capitalism, and a drug crisis. Usually, most of world building is done by composition.

The truth is, it's incredibly difficult (for me, it feels impossible, but I wouldn’t presume to generalize this limitation to brighter minds than my own) to create something entirely new without any grounding in prior knowledge. Try imagining something you've never seen before that has absolutely no resemblance to anything in the observable universe. Even H.P. Lovecraft, when attempting to describe his "unspeakable" cosmic gods, had to rely on familiar terms like tentacles and anthropomorphic features, or describe recognizable sensations to convey what Cthulhu and other entities might look like.

So while combination, when thoughtfully applied, can be an incredibly powerful creative strategy, I think there's still a vast unexplored space of possible combinations out there, waiting to be discovered.

In my Master's thesis, we explored this idea in the visual art domain. We hypothesized that there exists a huge, unexplored space of concept combinations, not because these concepts are incompatible, but because of the natural limitations of an individual artist's cultural horizon, including their geographical, temporal, and social context.

Let me give you an example: the concept of an "airplane" simply didn't exist during the Renaissance period, making it cognitively unavailable to artists of that era. And even today, when we're familiar with both concepts, there's still this subtle bias against combining Renaissance style with airplanes (even if it could be a very cool idea). This relates to what cognitive scientists call availability bias - we heavily rely on immediate examples that come to mind when thinking about a topic, which can limit our exploration of novel ideas.

Although trained across temporal and cultural boundaries, generative AI models inevitably absorb human biases. As a result, these models can
expect to predominantly produce cultural artifacts that align with human cognitive availability. James Evans and his team showed that counteracting such a bias could be key to algorithmic augmented scientific discovery [5, 6].

We developed a system that generates novel visual art concept combinations by modeling and counteracting these cognitive biases. We worked with the set of concepts extracted from the artworks of WikiArt, and two probability distributions using fine-tuned LLM models. The first is what we call the Artwork-level distribution - $$P(a|S)$$, which captures the probability of finding concept A in an artwork that contains a set of concepts S. The second is the Artist-level distribution - $$Q(a|S)$$, representing the probability of an artist using concept A given they've used concepts S in their whole artistic work.

The key difference between these distributions is their scope. If an artist has used concept A in one artwork and concept B in another, both concepts are within their cognitive reach, even if they've never combined them in a single piece. Our method looks for what we playfully call "alien" combinations (inspired by James Evans' work on alien scientific discoveries) by finding combinations that are surprisingly improbable in the artist-level distribution using a ranking system.

This leads us to discover combinations that are hard to find or conceive naturally because they contain concepts that are unavailable to all artists that have used a given set of concepts. For instance, no artist who worked in the Renaissance style could have known about airplanes. If they did, that would mean these concepts had coexisted in time or imagination (or that Renaissance style has returned in mainstream art, that has not happened as far as I know.)

Of course, we're making some assumptions here - like limiting our concept world to those used in WikiArt artworks, and assuming artists express all their conceptual knowledge in their work (which might not be realistic, an artist might know about something but choose never to paint it). But it gives us a interesting approximation of cognitive availability and lets us explore these low density or empty spaces of artistic combinations that have never been attempted and hard to even conceive of in our world (dataset).

If you're interested, you can read the paper here. However, this post aims to address a broader perspective beyond just discussing the paper. The key point is that while combinatorial creativity is often considered the least interesting and is frequently dismissed as the simplest form, it still holds immense power and unexplored potential especially with AI systems now capable of finding and exploiting what we have overlooked.

<!add images!




## References
[1] Pelaprat, E., & Cole, M. (2011). “minding the gap”: Imagination, creativity and human cognition. Integrative Psychological and Behavioral Science, 45(4), 397–418.

[2] Hassabis, D., & Maguire, E. A. (2009). The construction system of the brain. Philosophical Transactions of the Royal Society B: Biological Sciences, 364(1521), 1263–1271.

[3] Csikszentmihalyi, M. (1997). Flow and the psychology of discovery and invention. HarperPerennial, New York, 39, 1–16.

[4] Thagard, P., & Stewart, T. C. (2011). The aha! experience: Creativity through emergent binding in neural networks. Cognitive science, 35(1), 1–33.

[5] Gero, J. S. (1996). Creativity, emergence and evolution in design. Knowledge-Based Systems, 9(7), 435–448.

[6] Boden, M. A. (1998). Creativity and artificial intelligence. Artificial intelligence, 103(1-2), 347–356.

[7] Boden, M. A. (2004). The creative mind: Myths and mechanisms. Routledge.

[8] Franceschelli, G., & Musolesi, M. (2023). On the creativity of large language models. arXiv preprint arXiv:2304.00008.