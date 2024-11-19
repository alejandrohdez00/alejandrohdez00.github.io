---
title: "Philosophical thoughts about Creativity and AI"
date: 2024-10-27
mathjax: true
---

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>
    
<script type="text/javascript"
        src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

"Art is a mechanism that is always trying to destroy itself, always questioning what is or not is art"


Those were the words my uncle, the artist Pipo Hernandez, shared with me over dinner at his house while we discussed whether AI could truly be an artist. (If you're curious about his work, you can check it out [here](https://nfgaleria.com/artista/pipo-hernandez-rivero/) - I absolutely love it!)

A few months later, I found myself defending my Master's thesis, "Alien Recombination: Exploring Concept Blends Beyond Human Cognitive Availability" at the Technical University of Munich. I had the privilege to conduct this research alongside a brilliant team from both the Max Planck Institute for Human Development and the Max Planck Institute for Intelligent Systems.

Our project explored ways to improve artificial creativity, an admittedly ambitious goal for a master's thesis. To be honest, we couldn't hope to fully address such a complex challenge, especially since we're still discovering new dimensions of the problem itself.

In this post, I want to share my thoughts about the nature of creativity and the challenges of implementing it in machines, along with potential paths forward. This isn't meant to be a scientific article, think of it more as an invitation to dialogue, a way to organize my thoughts and hopefully inspire others to become as passionate about this topic as I am.


To-do:
- Boden creativity
- Remember and imagination as reconstruction
- Our thesis and our hypothesis
- Creative reasoning is very difficult to track, but it could composed of multiple transformations in an multidimensional space
- Open-endedness

## What is creativity?

Creativity is one of those concepts that seems to slip through our fingers just when we think we've grasped it. Some view it as a process that emerges from imagination [1], where imagination is seen as a reconstructive process based on prior knowledge [2]. Others define it as the process by which an individual generates new ideas or patterns using the symbols of a given domain [3]. Additionally, some interpretations view creativity as a fully combinatorial process, involving the combination of existing representations [4][5]. 

In computer science, Margaret Boden's definition has been particularly influential [6]. She describes creativity as "the ability to come up with ideas or artifacts that are new, surprising, and valuable" [7]. What makes this definition so useful is how it breaks creativity into "measurable" components: value (high quality and social acceptance), novelty (significant difference from existing artifacts), and surprise (deviation from expectations).

Boden identifies three distinct types of creativity:
Combinatorial creativity involves creating unexpected combinations of familiar ideas, like pairing chocolate with chili in a recipe.

Exploratory creativity is about finding new solutions within established frameworks, like a jazz musician discovering fresh melodies while working within traditional chord progressions.

Transformational creativity involves fundamentally changing how we think about something. Think of Einstein's theory of relativity revolutionizing our understanding of space and time, or how Picasso's cubist paintings transformed 20th-century artistic expression.

-add vanesh theory of creativity

## Don't underestimate the power of Combinatorial creativity

Combinatorial creativity is often considered the most basic form of creativity. While some studies suggest that LLMs are primarily limited to this type of creativity, lacking the deeper exploratory or transformative capabilities found in other forms [8], we shouldn't undervalue the power of combining different concepts.

In fact, the combination of concepts is a phenomenally powerful mechanism for creating wonderful things. Most of the creative works we love are, to a large degree, combinations of concepts we already know. Think about Star Wars for example. George Lucas created it by mixing westerns, samurai stories, feudal societies, and Flash Gordon, among other influences. Or consider Rapture, the charismatic city from Bioshock, it's basically a combination of a submarine city, art deco architecture, Ayn Rand's ultra-liberal capitalism, and a drug crisis. Usually, most of world building is done by composition.

The truth is, it's incredibly difficult (for me, it feels impossible, but I wouldn’t presume to generalize this limitation to brighter minds than my own) to create something entirely new without any grounding in prior knowledge. Try imagining something you've never seen before that has absolutely no resemblance to anything in the observable universe. Even H.P. Lovecraft, when attempting to describe his "unspeakable" cosmic gods, had to rely on familiar terms like tentacles and anthropomorphic features, or describe recognizable sensations to convey what Cthulhu and other entities might look like.

So while combination, when thoughtfully applied, can be an incredibly powerful creative strategy, I think there's still a vast unexplored space of possible combinations out there, waiting to be discovered.

In my Master's thesis, we explored this idea in the visual art domain. We hypothesized that there exists a huge, unexplored space of concept combinations, not because these concepts are incompatible, but because of the natural limitations of an individual artist's cultural horizon, including their geographical, temporal, and social context.

Let me give you an example: the concept of an "airplane" simply didn't exist during the Renaissance period, making it cognitively unavailable to artists of that era. And even today, when we're familiar with both concepts, there's still this subtle bias against combining Renaissance style with airplanes (even if it could be a very cool idea). This relates to what cognitive scientists call availability bias - we heavily rely on immediate examples that come to mind when thinking about a topic, which can limit our exploration of novel ideas.

Although trained across temporal and cultural boundaries, generative AI models inevitably absorb human biases. As a result, these models can expect to predominantly produce cultural artifacts that align with human cognitive availability. James Evans and his team showed that counteracting such a bias could be key to algorithmic augmented scientific discovery [5, 6].

We developed a system that generates novel visual art concept combinations by modeling and counteracting these cognitive biases. We worked with the set of concepts extracted from the artworks of WikiArt, and two probability distributions using fine-tuned LLM models. The first is what we call the Artwork-level distribution - \\(P(a|S)\\), which captures the probability of finding concept A in an artwork that contains a set of concepts S. The second is the Artist-level distribution - \\(Q(a|S)\\), representing the probability of an artist using concept A given they've used concepts S in their whole artistic work.

The key difference between these distributions is their scope. If an artist has used concept A in one artwork and concept B in another, both concepts are within their cognitive reach, even if they've never combined them in a single piece. Our method looks for what we playfully call "alien" combinations (inspired by James Evans' work on alien scientific discoveries) by finding combinations that are surprisingly improbable in the artist-level distribution using a ranking system.

This leads us to discover combinations that are hard to find or conceive naturally because they contain concepts that are unavailable to all artists that have used a given set of concepts. For instance, no artist who worked in the Renaissance style could have known about airplanes. If they did, that would mean these concepts had coexisted in time or imagination (or that Renaissance style has returned in mainstream art, that has not happened as far as I know.)

Of course, we're making some assumptions here - like limiting our concept world to those used in WikiArt artworks, and assuming artists express all their conceptual knowledge in their work (which might not be realistic, an artist might know about something but choose never to paint it). But it gives us a interesting approximation of cognitive availability and lets us explore these low density or empty spaces of artistic combinations that have never been attempted and hard to even conceive of in our world (dataset).

If you're interested, you can read the paper [here](https://arxiv.org/abs/2411.11494.) However, this post aims to address a broader perspective beyond just discussing the paper. The key point is that while combinatorial creativity is often considered the least interesting and is frequently dismissed as the simplest form, it still holds immense power and unexplored potential especially with AI systems now capable of finding and exploiting what we have overlooked. Our paper is merely a small step, a toy idea, compared to the progress that still lies ahead.

<!add images!

## Dynamics of Creativity

Now, let's dive into the tricky part: how creativity may work in practice, how we create things that are both novel and high-quality, what is its essence.

When I was young and creating my own stories and worlds, I intuitively understood creativity as transformations in a high-dimensional space. I am not any genious, of course I didn't know what a was a high-dimensional space then, but I intuitively knew I was taking my existing knowledge and transforming it until it satisfied what I now understand as my internal aesthetic fitness function.

Take character creation, for instance. When developing a protagonist or villain, I'd start with someone I knew, real or fictional, and begin transforming and mutating their traits, their personality dimensions. I might want to make a character more villainous while keeping them humble, creating an intriguing contradiction that makes them more interesting. At around age 10-12, I was constantly observing people around me, collecting interesting personality traits and behaviors that could work well on my characters.

I'd notice things like how someone smiles when embarrassed, or how another person accumulates anger silently before releasing it explosively in a stressful moment. By taking a bunch of these observations and modifying them, say, multiplying that suppressed anger dimension by 1000 (Yes, I know the multiplications here might seem unusual, but is a good way to visualize it), you can create a fascinating villain: someone who could be noble and humble but carries deep resentment that eventually erupts like a nuclear bomb, devastating everything around them. There are already famous characters that reflect this idea, though with more layers of complexity, like the Joker (the movie), Jinx from Arcane, and Eren from Shingeki no Kyojin.

This process isn't limited to character development, it applies equally to world-building and plot structure. You're constantly mutating and transforming the artifact in your mind until it achieves that sweet spot desired of novelty, surprise, and value.

This perspective led to an interesting conversation with my uncle about making an AI artist. I suggested that understanding creativity in computational terms, or at least having a detailed explanation of its mechanisms, could help to achieve this, if possible. Then, I asked him to recall how he came up with the idea for his latest artwork, which was exhibited at ARCO, Spain's International Contemporary Art Fair.

Explaining this artistic piece goes against its essence, but trust me, we could discuss its intricacies for hours. Still, I’ll try to focus on the main point. As you can see in Figure X, the piece consists of a wall displaying Romanticism paintings with black weighing scales on the floor. The mere presence of Romantic paintings in a Contemporary Art fair is already surprising, but the piece explores current dialogue mechanism between artwork and spectator.

In our current era, when confronted with art we don't immediately understand, we often demand quick explanations. We've lost our patience for mystery, for engaging in slow but intense dialogue with an artwork, for dealing with ambiguity. Conditioned by fast internet and instant information, we expect immediate answers from art. However, art often transmits questions rather than answers, usually philosophical questions without clear solutions.

The piece juxtaposes two elements: Romantic paintings, which invite philosophical dialogue and embrace mystery (a highlight of Romanticism), and weighing scales, which represent our modern preference for functional questions with immediate, concrete answers. Functional questions are asked to obtain factual information. When you step on a weighing scale, you are essentially asking, "What is my weight?" and you quickly receive an answer. At the fair, observers would quickly tire of contemplating the paintings and start playing with the scales instead. The whole scene captures our discomfort with ambiguity, our intolerance to questions that might not have definitive answers, our fear to the abyss. It shows how quickly we retreat to the safety of measurable, quantifiable responses in a world we struggle to understand, avoiding questions that lack factual, immutable answers.

Art is not meant to deliver easy truths; it is a dialogue, a philosophical conversation that often raises more questions than it answers. Moreover, this dialogue shifts over time, even if the artwork remains unchanged, because it is influenced by the current cultural context. Borges' story *"Pierre Menard, Author of the Quixote"* is a brilliant exploration of this idea. It's a must-read if you haven’t encountered it yet! But now, let's return to the creative process.

As I mentioned, when I asked my uncle about the origins of his artwork, he told me that it started with a problem: "There is no true 21st-century art - everything we're seeing is just an extension of 20th-century movements. Like the period before Romanticism emerged, we're in a creative crisis, living in the shadow of the previous era's huge influence, without a distinctive artistic style to call our own."

That's where it began, with framing the problem. And then came the real magic, that *thing* that machines will find so hard to replicate. As he put it: "So I thought... if we're still showing 20th-century art in 21st-century exhibitions, why not go even further back? What about bringing Romanticism into the present?"

This was the seed, the initial spark that started the posterior creative process. Like a butterfly effect in motion, this simple idea underwent a series of transformations and mutations, eventually evolving into the final piece that captured both the irony and the deeper truth about our relationship with art today.

However, we are computer scientists. We may have identified the seed of the creative process, but how do we computationally unpack what my uncle actually did?

Let me introduce an fascinating [concept](https://arxiv.org/abs/0812.4360) from Jürgen Schmidhuber that might sound crazy at first, but ended up feeling incredibly intuitive to me: creativity is fundamentally about data compression. 

We live in an environment full of historical data: our entire record of actions, observations, experiences and reward signals. As intelligent systems, our primary goal is survival, which requires predicting environmental phenomena. We do this by identifying regularities and compressing information. To compress this history of observations, we create internal representations or symbols for elements that frequently recur. Even when predictability is limited, efficient compression is still possible by assigning shorter codes to events with high probability. For example, the sun rises daily, making it efficient to create an internal symbol like "daylight" to represent this consistent pattern, rather than repeatedly storing raw data. 

In principle, any regularity in our data history can serve as a basis for compression. This compressed version of the data acts as a simplified explanation of our experiences, enabling us to process and predict the world more effectively.

Creativity, then, is the ability to find novel and efective ways of compressing data, discovering overlooked regularities in our historical information. Thus, science and art are surprisingly similar, they're just approaching this compression differently.

In the science case, for example, take Newton’s discovery of gravity. This was essentially a way of compressing a regular pattern in the data: things fall. With this insight, if we want to store the event of a lemon falling from a tree, we don’t need to save every single bit of every frame of it dropping. As soon as the lemon detaches from the tree, we can predict its entire trajectory based on the concept of gravity, saving a lot of space.

Now look at Einstein’s theory of relativity. It’s a very novel and efficient data compression. Sure, the theory is complicated, but at its core, it boils down to: *The laws of physics are the same for all observers in inertial frames, and the speed of light in a vacuum is constant regardless of motion.* When this is assumed to be true, the rest of the theory and their implications unfold naturally, aligning with empirical observations. This means we no longer need to store certain bits of historical data explicitly, as they can be derived from the theory. Einstein essentially uncovered a new and very efficient way to compress the data of our universe, allowing us to predict real-world phenomena with precision, reducing the informational "storage cost" of storing our environment.

Here's my take on extending this idea: Art works similarly, but with a twist. Science focuses on formally identifying and defining the nature of compression progress by discovering new regularities in the data, essentially creating efficient, predictive models of reality. Art, on the other hand, is about presenting information in a uniquely compressed way, with an emphasis on novelty and surprise rather than strict prediction accuracy.

My uncle didn't just recite a message, he compressed complex ideas about our relationship with art using paintings and weighing scales. Our job as observers is to decompress that information, and the beauty emerges from that very process of discovery.

However, art is inherently subjective, and this subjectivity is perhaps its most defining characteristic. What is subjectivity if we are treating art as compressed information? Subjectivity arises from the differences in the historical data and knowledge representation between the artist and the observer.

When we finally understand an artwork, we've discovered shared regularities in our collective experience. Even when we interpret things differently or have different backgrounds, we're drawing from fundamentally similar human experiences, similar historical data. That is why art works, and discovering these connections can evoke powerful emotional responses like crying, laughing, joy, or terror.

The flip side is that if the observer is missing some part of the historical data or representations, they might not decompress the information exactly as the artist originally did. However, as I mentioned earlier, while this could be a problem in science, it’s not an issue in art. Art encodes information in a way that allows observers to uncover other regularities, leading to meaningful decompressions that are valuable to them personally. 

For example, I might not fully understand Romanticism history and thus cannot grasp my uncle's intended full message in the artwork. Yet, I could still interpret the weighting scales as black mirrors reflecting me observing the art, extracting a unique message about my own subjective experience. This is why art has no dead ends, it has no fixed rules. Unlike science, the decompression process in art can lead to entirely different and equally valid results.

Again, Borges' Pierre Menard captured this perfectly. Even the same text can yield different information extraction for different people, based on their individual histories and associations.

*Note: We are focusing in a more contemporary art style in this description, where the beauty in the realization of new regularities in the data is more obvious. More traditional paintings, as argued by Schmidhuber, also fulfill this. By applying geometry and appealing graphic ideas they compress data in an appealing and novel way, painting less than the sum of its parts.*

## Are AI models creative already?

Creativity is such a hard to define concept, but it is even harder to get an intuition of how it works. But usually it starts but framing a problem or question, and having a undefined initial artifact (usually a compose of our prior knowledge.) Then, as my uncle did, you start applying transformations, high-dimensional ones to the artifact, the answer, the information you want to transmit. However, this transformation are not obtained by gradient descent usually. They are a result of a divergent search, sometimes a no-goal search, or where the goal is the hyperbole, the exaggeration not convergence to an objective.

Today’s state-of-the-art AI models, like LLMs and diffusion models, follow a standard paradigm: they receive a question or prompt and then generate what they predict to be an appropriate response. While these models are excellent at producing outputs within the distribution of their training data, they lack the ability to explore, combine, and transform this information in genuinely novel ways to create new and valuable knowledge.

However, in the creative thinking context they have main two problems:

### Creativity cannot be fully approximated using gradient descent

AI models do not do divergent search, they optimize for an objective of what is statistically probable response to the prompt. That is exactly the anthithesis of being creative! The transformation that my uncle did: 

Problem: 20-century paintings in 21-century expositions -> Transformation: Substract in the temporal dimension -> Result: Romanticism paintings in 21-century expositions

is not a trivial transformation, one that can be obtained by applying gradient descent to the problem of finding the next token of the sequence.

The way we prompt generative AI models is we prompt what we want to see and the model returns it. We prompt "A painting of an astronout in a horse in the Sun" and the model will output that image. But the decision, the creative effort is mine of identifying that prompt as something novel, the creativity of the model is limited by the creativity of the human prompting it. In our paper we try to improve this issue by exploring the space of artistic combinations, selecting novel ones and prompting them, however the problem remains. The text-to-image model is trained to output in-distribution images of the training data.

### The training data is not aimed to creative thinking

For example, text-to-image models like Stable diffusion are designed to take a description an ouput a probable image. However, they are not design to handle questions as a prompt and output a novel and valuable image. High quality art and creativity in general do not work like: I want to paint a dog and I paint it. Usually it begins with a question or an open-ended prompt: "Create a work of art whose purpose is to reject the logic, reason, and aestheticism of modern capitalist society and art", here there are no rules to answer this. The objective is to find an effective way of portraying this. How would you answer to this prompt? How would you tackle this problem? Stable-diffusion outputed Figure X. However, Marcel Duchamp outputed Figure X. The artwork *Fountain*, is not a trivial response to the promt, but it is a very very effective one. However, Stable diffusion is outputting an amalgam of what is common to see when you see the words "capitalist", "reason", "logic" or "reject". The prompt is the purpose that the Dadaism movement had when it was originated. Current AI models are not designed to learn this kind of non-trivial, divergent reasoning. However, I am still in doubt if this problem is because the model properties, or the problem properties, maybe the problem is not solvable by gradient descent. Or maybe is that is not being trained in the correct data. 

I would be very curious to see what would happen if we collect a dataset in the form (idea that originated the artwork, image of the artwork) without information of what's in the artwork. Would the AI model able to learn these non trivial transformations and functions. Will it be able to generalize a function that takes a creative artistic problem and without explicit help of what objects it needs to portrait be able to obtain better and ingenious results, (in the form of image or in the form of text, imaging an LLM capable of designing a creative response to the artistic problem and then craft the prompt to its own text-to-image model)? As I said, I would be curious but my intution tells me that this would not work, mainly because of the nature of creativity. Maybe it would return surprising and cool results, but again we will be in the same problem. We are doing gradient descent in a task that is not suitable for it. 











## References
[1] Pelaprat, E., & Cole, M. (2011). “minding the gap”: Imagination, creativity and human cognition. Integrative Psychological and Behavioral Science, 45(4), 397–418.

[2] Hassabis, D., & Maguire, E. A. (2009). The construction system of the brain. Philosophical Transactions of the Royal Society B: Biological Sciences, 364(1521), 1263–1271.

[3] Csikszentmihalyi, M. (1997). Flow and the psychology of discovery and invention. HarperPerennial, New York, 39, 1–16.

[4] Thagard, P., & Stewart, T. C. (2011). The aha! experience: Creativity through emergent binding in neural networks. Cognitive science, 35(1), 1–33.

[5] Gero, J. S. (1996). Creativity, emergence and evolution in design. Knowledge-Based Systems, 9(7), 435–448.

[6] Boden, M. A. (1998). Creativity and artificial intelligence. Artificial intelligence, 103(1-2), 347–356.

[7] Boden, M. A. (2004). The creative mind: Myths and mechanisms. Routledge.

[8] Franceschelli, G., & Musolesi, M. (2023). On the creativity of large language models. arXiv preprint arXiv:2304.00008.