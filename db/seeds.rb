# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create({email: 'kabbnigam@gmail.com', username: 'kabnigam', password: 'password'})
User.create({email: 'tonyhoyinliu@gmail.com', username: 'tliu', password: 'password'})
User.create({email: 'guest@guest.com', username: 'Guest', password: 'password'})

Article.create({
  title: "Hallucinatory 'voices' shaped by local culture, Stanford anthropologist says",
  body: 'People suffering from schizophrenia may hear “voices” – auditory hallucinations – differently depending on their cultural context, according to new Stanford research.

In the United States, the voices are harsher, and in Africa and India, more benign, said Tanya Luhrmann, a Stanford professor of anthropology and first author of the article in the British Journal of Psychiatry.

The experience of hearing voices is complex and varies from person to person, according to Luhrmann. The new research suggests that the voice-hearing experiences are influenced by one’s particular social and cultural environment – and this may have consequences for treatment.

In an interview, Luhrmann said that American clinicians “sometimes treat the voices heard by people with psychosis as if they are the uninteresting neurological byproducts of disease which should be ignored. Our work found that people with serious psychotic disorder in different cultures have different voice-hearing experiences. That suggests that the way people pay attention to their voices alters what they hear their voices say. That may have clinical implications.”

Positive and negative voices
Luhrmann said the role of culture in understanding psychiatric illnesses in depth has been overlooked.

“The work by anthropologists who work on psychiatric illness teaches us that these illnesses shift in small but important ways in different social worlds. Psychiatric scientists tend not to look at cultural variation. Someone should, because it’s important, and it can teach us something about psychiatric illness,” said Luhrmann, an anthropologist trained in psychology. She is the Watkins University Professor at Stanford.

For the research, Luhrmann and her colleagues interviewed 60 adults diagnosed with schizophrenia – 20 each in San Mateo, California; Accra, Ghana; and Chennai, India. Overall, there were 31 women and 29 men with an average age of 34. They were asked how many voices they heard, how often, what they thought caused the auditory hallucinations, and what their voices were like.

“We then asked the participants whether they knew who was speaking, whether they had conversations with the voices, and what the voices said. We asked people what they found most distressing about the voices, whether they had any positive experiences of voices and whether the voice spoke about sex or God,” she said.

The findings revealed that hearing voices was broadly similar across all three cultures, according to Luhrmann. Many of those interviewed reported both good and bad voices, and conversations with those voices, as well as whispering and hissing that they could not quite place physically. Some spoke of hearing from God while others said they felt like their voices were an “assault” upon them.

‘Voices as bombardment’
The striking difference was that while many of the African and Indian subjects registered predominantly positive experiences with their voices, not one American did. Rather, the U.S. subjects were more likely to report experiences as violent and hateful – and evidence of a sick condition.

The Americans experienced voices as bombardment and as symptoms of a brain disease caused by genes or trauma.

One participant described the voices as “like torturing people, to take their eye out with a fork, or cut someone’s head and drink their blood, really nasty stuff.” Other Americans (five of them) even spoke of their voices as a call to battle or war – “the warfare of everyone just yelling.”

Moreover, the Americans mostly did not report that they knew who spoke to them and they seemed to have less personal relationships with their voices, according to Luhrmann.

Among the Indians in Chennai, more than half (11) heard voices of kin or family members commanding them to do tasks. “They talk as if elder people advising younger people,” one subject said. That contrasts to the Americans, only two of whom heard family members. Also, the Indians heard fewer threatening voices than the Americans – several heard the voices as playful, as manifesting spirits or magic, and even as entertaining. Finally, not as many of them described the voices in terms of a medical or psychiatric problem, as all of the Americans did.

In Accra, Ghana, where the culture accepts that disembodied spirits can talk, few subjects described voices in brain disease terms. When people talked about their voices, 10 of them called the experience predominantly positive; 16 of them reported hearing God audibly. “Mostly, the voices are good,” one participant remarked.

Individual self vs. the collective
Why the difference? Luhrmann offered an explanation: Europeans and Americans tend to see themselves as individuals motivated by a sense of self identity, whereas outside the West, people imagine the mind and self interwoven with others and defined through relationships.

“Actual people do not always follow social norms,” the scholars noted. “Nonetheless, the more independent emphasis of what we typically call the ‘West’ and the more interdependent emphasis of other societies has been demonstrated ethnographically and experimentally in many places.”

As a result, hearing voices in a specific context may differ significantly for the person involved, they wrote. In America, the voices were an intrusion and a threat to one’s private world – the voices could not be controlled.

However, in India and Africa, the subjects were not as troubled by the voices – they seemed on one level to make sense in a more relational world. Still, differences existed between the participants in India and Africa; the former’s voice-hearing experience emphasized playfulness and sex, whereas the latter more often involved the voice of God.

The religiosity or urban nature of the culture did not seem to be a factor in how the voices were viewed, Luhrmann said.

“Instead, the difference seems to be that the Chennai (India) and Accra (Ghana) participants were more comfortable interpreting their voices as relationships and not as the sign of a violated mind,” the researchers wrote.

Relationship with voices
The research, Luhrmann observed, suggests that the “harsh, violent voices so common in the West may not be an inevitable feature of schizophrenia.” Cultural shaping of schizophrenia behavior may be even more profound than previously thought.

The findings may be clinically significant, according to the researchers. Prior research showed that specific therapies may alter what patients hear their voices say. One new approach claims it is possible to improve individuals’ relationships with their voices by teaching them to name their voices and to build relationships with them, and that doing so diminishes their caustic qualities. “More benign voices may contribute to more benign course and outcome,” they wrote.

Co-authors for the article included R. Padmavati and Hema Tharoor from the Schizophrenia Research Foundation in Chennai, India, and Akwasi Osei from the Accra General Psychiatric Hospital in Accra, Ghana.

What’s next in line for Luhrmann and her colleagues?

“Our hunch is that the way people think about thinking changes the way they pay attention to the unusual experiences associated with sleep and awareness, and that as a result, people will have different spiritual experiences, as well as different patterns of psychiatric experience,” she said, noting a plan to conduct a larger, systematic comparison of spiritual, psychiatric and thought process experiences in five countries.',
  source: "http://news.stanford.edu/2014/07/16/voices-culture-luhrmann-071614/",
  user_id: 1
  })

Article.create({
  title: "The dark side of the universe – a primer",
  body: 'Over the past 40 years astronomers have realised that everything we can see – all the stars, planets and galaxies – make up less than 5% of the entire universe. What is the rest? The short answer is, we have no idea.
What we do know is there are two gaping holes in our understanding of our universe. As a placeholder, physicists call them dark matter and dark energy.

In a nutshell, dark matter is the invisible stuff which we can only detect from the way its immense gravity moves stars and galaxies.

Dark energy, on the other hand, is the mysterious something causing the universe to expand with ever increasing speed.

We don’t know if dark matter and dark energy are related – in fact they’re probably two completely different phenomena, both called “dark” just because we can’t see them.

Dark matter
How was it discovered?

Since the 1930s astronomers knew that the way galaxies spin did not make sense. The stars at the edges of galaxies were moving much faster than expected – so fast they should have been flung off the cosmic merry-go-round and out into deep space.

But these strange motions could be explained if there was a bunch of extra matter in and around the galaxies – matter that we can’t see. It’s this “dark matter” that holds galaxies together.

Since then, many other observations beyond the scale of whirling galaxies, from the choreography of galaxy clusters, to the collision of nebulae, all suggested the same thing.

Although some physicists have entertained other theories, such as modifications to gravity, by now most are pretty sure dark matter exists. It’s the only explanation that suits all the data.

What do we know?

We know dark matter doesn’t emit light (nor does it absorb or reflect it), so it can’t be made of rogue planets or clouds of normal matter. We know it’s “cold” (which in physics-speak means it moves slowly compared with the speed of light). We know it has gravity. We also know it doesn’t interact very strongly with anything, even itself – otherwise the dark matter would collapse into flat structures such as galaxies, rather than the spherical haloes we detect.

Oh, and it makes up about 27% of the universe.

What could dark matter be?

The bottom line is it is probably some new kind of particle (or a whole family of particles) that we have never detected before. Dark matter particles could be all around you, and floating through your body right this second.

This means the answer to this grand cosmological puzzle, affecting the universe on scales of mllions of light years, could lie in the physics of tiny particles, much smaller than an atom.

Over the past 30 years physicists have sifted through dozens of different dark matter candidates. The prime suspect at the moment is a kind of particle called a weakly interacting massive particle, or WIMP. This is a kind of heavy particles that feel only the weak force.

One of the goals of CERN’s Large Hadron Collider is to look for WIMPs (the same way it found the Higgs Boson in 2013) – the elusive dark matter particles might be created when protons are smashed together at near the speed of light.

Can we detect dark matter?

Besides CERN, there are more than 30 experiments around the world devoted to finding dark matter.

Some of these are dedicated telescopes searching for the signature of particles created when two particles of dark matter annihilate.

Others are giant vats of liquid xenon watching for a telltale flash when a dark matter particle nudges an atomic nucleus. None has yet made a convincing detection of a dark matter particle, although some of the experiments have ruled out various possibilities of what dark matter might be.

It remains a possibility that dark matter may never be directly detectable – especially if it turns out to be a particle that does not even feel the weak force.

The dark force and dark photons

Some physicists have proposed that dark matter particles can interact with one another via a new force of nature – called, yes, the dark force and transmitted by dark photons (aka dark radiation).

There may even be different kinds of dark matter, some of which feels the dark force, and some do not.

Dark energy
How was dark energy discovered?

In the early 20th century, physicists including Albert Einstein imagined the universe as static and unchanging. But in 1929 American astronomer Edwin Hubble observed the motions of exploding stars and discovered the universe was expanding. In fact the universe must have had a beginning – a moment of creation called the big bang.

We can imagine the big bang a bit like an explosion. But after that initial burst, physicists thought the expansion should begin to slow down over time, as gravity acted to pull everything back to a single point again.

The question was whether the universe would ever stop expanding and reverse direction, falling back into a “big crunch”.

Then, in 1998, things got a bit more complicated.

Using the same method as Edwin Hubble (and with the telescope named after him) astronomers found that the expansion of the universe was not slowing down, but instead was accelerating. Galaxies are flying away from each other faster and faster each year.

It was a strange and unexpected result. A bit like if you were driving on a flat highway, took your foot off the accelerator – and then your car began to speed up!

Yet the data were convincing. Physicists realised this expansion must be driven by some sort of energy, and they called it “dark energy”.

What we know

We know that dark energy affects the universe as a whole. We know it acts a bit like a negative gravity pushing galaxies away from one another.

We also know that dark energy did not kick in until a few billion years ago. (For the first half of its life, the expansion of the universe was slowing down due to gravity pulling everything together.)

This makes physicists think dark energy is somehow tied up with space itself. This means its density in space is always the same, but as the universe expands (that is as more space is created), the amount of dark energy also increases.

This would explain why the amount of dark energy was insignificant when the universe was small.

What could it be?

The answer to the mystery of dark energy might also lie in the minuscule quantum realm.

In quantum theory, “empty space” is not empty at all, but filled with a soup of particles continually popping into and out of existence. As weird as it sounds, physicists have actually measured the force created by these so-called “virtual particles” in the lab.

The problem is, when physicists try to calculate how much energy these virtual particles contribute to each cubic metre of empty space, they come out with a number that’s a factor of 10120 too large when compared to the density of dark energy (as measured from the accelerated expansion of the universe). Thats a 1 with 120 zeroes after it, a ludicrous answer called “the worst theoretical prediction in the history of physics”.

Quintessence

Some physicists think dark energy could be akin to a fifth force of nature, pervading all of space. They call it “quintessence”, after the fifth element predicted by the Greek philosophers. As opposed to the cosmological constant, the quintessence is imagined to change over time – it was once attractive, but is now repulsive.

The big rip and phantom dark energy

In some theories, the quintessence can continue to grow stronger (in which case it’s called phantom dark energy).

This could destroy the universe.

If the expansion of the universe continues to accelerate, eventually reach the speed of light – first galaxies and stars would be cut off from one another, then eventually the space between the sun and the Earth would expand faster than the speed of light and individual atoms would be torn asunder as the space within them expanded at faster than the speed of light. This is the big rip.

A new gravity?

Dark energy might not be a new force, it might just be a sign that, at very large scales, gravity does not behave as Einstein’s theory of general relatively describes.

The ΛCDM (lambda cold dark matter) model
This is the name for the astrophysicists’ current best picture of the way the cosmos is screwed together.

Λ (or lambda) stands for dark energy, while cold dark matter describes the consensus that dark matter must be made up of some kind of slow moving, previously unknown particle.

In this picture, dark matter makes up 27% of the mass-energy of the universe, dark energy makes up about 68%, and ordinary matter – that of the stars and galaxies and our own flesh and blood – makes up less than 5%.',
  source:'https://cosmosmagazine.com/physics/the-dark-side-of-the-universe-a-primer',
  user_id: 2
  })
