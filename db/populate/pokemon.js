const pokemon = [
  {
    name: 'Bulbasaur',
    index: '1',
    image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.'
  },
  {
    name: 'Ivysaur',
    index: 2,
    image: 'https://img.pokemondb.net/artwork/ivysaur.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.'
  },
  {
    name: 'Venusaur',
    index: 3,
    image: 'https://img.pokemondb.net/artwork/venusaur.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.'
  },
  {
    name: 'Charmander',
    index: 4,
    image: 'https://img.pokemondb.net/artwork/charmander.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.'
  },
  {
    name: 'Charmeleon',
    index: 5,
    image: 'https://img.pokemondb.net/artwork/charmeleon.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'When it swings its burning tail, it elevates the temperature to unbearably high levels.'
  },
  {
    name: 'Charizard',
    index: 6,
    image: 'https://img.pokemondb.net/artwork/charizard.jpg',
    type1: 'Fire',
    type2: 'Flying',
    entry:
      'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.'
  },
  {
    name: 'Squirtle',
    index: 7,
    image: 'https://img.pokemondb.net/artwork/squirtle.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.'
  },
  {
    name: 'Wartortle',
    index: 8,
    image: 'https://img.pokemondb.net/artwork/wartortle.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.'
  },
  {
    name: 'Blastoise',
    index: 9,
    image: 'https://img.pokemondb.net/artwork/blastoise.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'A brutal POKéMON with pressurized water jets on its shell. They are used for high speed tackles.'
  },
  {
    name: 'Caterpie',
    index: 10,
    image: 'https://img.pokemondb.net/artwork/caterpie.jpg',
    type1: 'Bug',
    type2: null,
    entry:
      'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.'
  },
  {
    name: 'Metapod',
    index: 11,
    image: 'https://img.pokemondb.net/artwork/metapod.jpg',
    type1: 'Bug',
    type2: null,
    entry:
      'This POKéMON is vulnerable to attack while its shell is soft, exposing its weak and tender body.'
  },
  {
    name: 'Butterfree',
    index: 12,
    image: 'https://img.pokemondb.net/artwork/butterfree.jpg',
    type1: 'Bug',
    type2: 'Flying',
    entry:
      'In battle, it flaps its wings at high speed to release highly toxic dust into the air.'
  },
  {
    name: 'Weedle',
    index: 13,
    image: 'https://img.pokemondb.net/artwork/weedle.jpg',
    type1: 'Bug',
    type2: 'Poison',
    entry:
      'Often found in forests, eating leaves. It has a sharp venomous stinger on its head.'
  },
  {
    name: 'Kakuna',
    index: 14,
    image: 'https://img.pokemondb.net/artwork/kakuna.jpg',
    type1: 'Bug',
    type2: 'Poison',
    entry:
      'Almost incapable of moving, this POKéMON can only harden its shell to protect itself from predators.'
  },
  {
    name: 'Beedrill',
    index: 15,
    image: 'https://img.pokemondb.net/artwork/beedrill.jpg',
    type1: 'Bug',
    type2: 'Poison',
    entry:
      'Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.'
  },
  {
    name: 'Pidgey',
    index: 16,
    image: 'https://img.pokemondb.net/artwork/pidgey.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.'
  },
  {
    name: 'Pidgeotto',
    index: 17,
    image: 'https://img.pokemondb.net/artwork/pidgeotto.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'Very protective of its sprawling territorial area, this POKéMON will fiercely peck at any intruder.'
  },
  {
    name: 'Pidgeot',
    index: 18,
    image: 'https://img.pokemondb.net/artwork/pidgeot.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'When hunting, it skims the surface of water at high speed to pick off unwary prey such as MAGIKARP.'
  },
  {
    name: 'Rattata',
    index: 19,
    image: 'https://img.pokemondb.net/artwork/rattata.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Bites anything when it attacks. Small and very quick, it is a common sight in many places.'
  },
  {
    name: 'Raticate',
    index: 20,
    image: 'https://img.pokemondb.net/artwork/raticate.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'It uses its whiskers to maintain its balance. It apparently slows down if they are cut off.'
  },
  {
    name: 'Spearow',
    index: 21,
    image: 'https://img.pokemondb.net/artwork/spearow.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.'
  },
  {
    name: 'Fearow',
    index: 22,
    image: 'https://img.pokemondb.net/artwork/fearow.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'With its huge and magnificent wings, it can keep aloft without ever having to land for rest.'
  },
  {
    name: 'Ekans',
    index: 23,
    image: 'https://img.pokemondb.net/artwork/ekans.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Moves silently and stealthily. Eats the eggs of birds, such as PIDGEY and SPEAROW, whole.'
  },
  {
    name: 'Arbok',
    index: 24,
    image: 'https://img.pokemondb.net/artwork/arbok.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'It is rumored that the ferocious warning markings on its belly differ from area to area.'
  },
  {
    name: 'Pikachu',
    index: 25,
    image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
  },
  {
    name: 'Raichu',
    index: 26,
    image: 'https://img.pokemondb.net/artwork/raichu.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'Its long tail serves as a ground to protect itself from its own high voltage power.'
  },
  {
    name: 'Sandshrew',
    index: 27,
    image: 'https://img.pokemondb.net/artwork/sandshrew.jpg',
    type1: 'Ground',
    type2: null,
    entry:
      'Burrows deep underground in arid locations far from water. It only emerges to hunt for food.'
  },
  {
    name: 'Sandslash',
    index: 28,
    image: 'https://img.pokemondb.net/artwork/sandslash.jpg',
    type1: 'Ground',
    type2: null,
    entry:
      'Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape.'
  },
  {
    name: 'Nidoran\u2640',
    index: '29',
    image: 'https://img.pokemondb.net/artwork/nidoran-f.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Although small, its venomous barbs render this POK\u00e9MON dangerous. The female has smaller horns.'
  },
  {
    name: 'Nidorina',
    index: '30',
    image: 'https://img.pokemondb.net/artwork/nidorina.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'The female\u2019s horn develops slowly. Prefers physical attacks such as clawing and biting.'
  },
  {
    name: 'Nidoqueen',
    index: '31',
    image: 'https://img.pokemondb.net/artwork/nidoqueen.jpg',
    type1: 'Poison',
    type2: 'Ground',
    entry:
      'Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.'
  },
  {
    name: 'Nidoran\u2642',
    index: '32',
    image: 'https://img.pokemondb.net/artwork/nidoran-m.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.'
  },
  {
    name: 'Nidorino',
    index: '33',
    image: 'https://img.pokemondb.net/artwork/nidorino.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'An aggressive POK\u00e9MON that is quick to attack. The horn on its head secretes a powerful venom.'
  },
  {
    name: 'Nidoking',
    index: '34',
    image: 'https://img.pokemondb.net/artwork/nidoking.jpg',
    type1: 'Poison',
    type2: 'Ground',
    entry:
      'It uses its powerful tail in battle to smash, constrict, then break the prey\u2019s bones.'
  },
  {
    name: 'Clefairy',
    index: '35',
    image: 'https://img.pokemondb.net/artwork/clefairy.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Its magical and cute appeal has many admirers. It is rare and found only in certain areas.'
  },
  {
    name: 'Clefable',
    index: '36',
    image: 'https://img.pokemondb.net/artwork/clefable.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'A timid fairy POK\u00e9MON that is rarely seen. It will run and hide the moment it senses people.'
  },
  {
    name: 'Vulpix',
    index: '37',
    image: 'https://img.pokemondb.net/artwork/vulpix.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'At the time of birth, it has just one tail. The tail splits from its tip as it grows older.'
  },
  {
    name: 'Ninetales',
    index: '38',
    image: 'https://img.pokemondb.net/artwork/ninetales.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse.'
  },
  {
    name: 'Jigglypuff',
    index: '39',
    image: 'https://img.pokemondb.net/artwork/jigglypuff.jpg',
    type1: 'Normal',
    type2: 'Normal',
    entry:
      'When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.'
  },
  {
    name: 'Wigglytuff',
    index: '40',
    image: 'https://img.pokemondb.net/artwork/wigglytuff.jpg',
    type1: 'Normal',
    type2: 'Normal',
    entry:
      'The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.'
  },
  {
    name: 'Zubat',
    index: '41',
    image: 'https://img.pokemondb.net/artwork/zubat.jpg',
    type1: 'Poison',
    type2: 'Flying',
    entry:
      'Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.'
  },
  {
    name: 'Golbat',
    index: '42',
    image: 'https://img.pokemondb.net/artwork/golbat.jpg',
    type1: 'Poison',
    type2: 'Flying',
    entry:
      'Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly.'
  },
  {
    name: 'Oddish',
    index: '43',
    image: 'https://img.pokemondb.net/artwork/oddish.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.'
  },
  {
    name: 'Gloom',
    index: '44',
    image: 'https://img.pokemondb.net/artwork/gloom.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'The fluid that oozes from its mouth isn\u2019t drool. It is a nectar that is used to attract prey.'
  },
  {
    name: 'Vileplume',
    index: '45',
    image: 'https://img.pokemondb.net/artwork/vileplume.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.'
  },
  {
    name: 'Paras',
    index: '46',
    image: 'https://img.pokemondb.net/artwork/paras.jpg',
    type1: 'Bug',
    type2: 'Grass',
    entry:
      'Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.'
  },
  {
    name: 'Parasect',
    index: '47',
    image: 'https://img.pokemondb.net/artwork/parasect.jpg',
    type1: 'Bug',
    type2: 'Grass',
    entry:
      'A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.'
  },
  {
    name: 'Venonat',
    index: '48',
    image: 'https://img.pokemondb.net/artwork/venonat.jpg',
    type1: 'Bug',
    type2: 'Poison',
    entry:
      'Lives in the shadows of tall trees where it eats insects. It is attracted by light at night.'
  },
  {
    name: 'Venomoth',
    index: '49',
    image: 'https://img.pokemondb.net/artwork/venomoth.jpg',
    type1: 'Bug',
    type2: 'Poison',
    entry:
      'The dust-like scales covering its wings are color coded to indicate the kinds of poison it has.'
  },
  {
    name: 'Diglett',
    index: '50',
    image: 'https://img.pokemondb.net/artwork/diglett.jpg',
    type1: 'Ground',
    type2: null,
    entry:
      'Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground.'
  },
  {
    name: 'Dugtrio',
    index: '51',
    image: 'https://img.pokemondb.net/artwork/dugtrio.jpg',
    type1: 'Ground',
    type2: null,
    entry:
      'A team of DIGLETT triplets. It triggers huge earthquakes by burrowing 60 miles underground.'
  },
  {
    name: 'Meowth',
    index: '52',
    image: 'https://img.pokemondb.net/artwork/meowth.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.'
  },
  {
    name: 'Persian',
    index: '53',
    image: 'https://img.pokemondb.net/artwork/persian.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.'
  },
  {
    name: 'Psyduck',
    index: '54',
    image: 'https://img.pokemondb.net/artwork/psyduck.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'While lulling its enemies with its vacant look, this wily POK\u00e9MON will use psychokinetic powers.'
  },
  {
    name: 'Golduck',
    index: '55',
    image: 'https://img.pokemondb.net/artwork/golduck.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Often seen swimming elegantly by lake shores. It is often mistaken for the Japanese monster, Kappa.'
  },
  {
    name: 'Mankey',
    index: '56',
    image: 'https://img.pokemondb.net/artwork/mankey.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'Extremely quick to anger. It could be docile one moment then thrashing away the next instant.'
  },
  {
    name: 'Primeape',
    index: '57',
    image: 'https://img.pokemondb.net/artwork/primeape.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'Always furious and tenacious to boot. It will not abandon chasing its quarry until it is caught.'
  },
  {
    name: 'Growlithe',
    index: '58',
    image: 'https://img.pokemondb.net/artwork/growlithe.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'Very protective of its territory. It will bark and bite to repel intruders from its space.'
  },
  {
    name: 'Arcanine',
    index: '59',
    image: 'https://img.pokemondb.net/artwork/arcanine.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'A POK\u00e9MON that has been admired since the past for its beauty. It runs agilely as if on wings.'
  },
  {
    name: 'Poliwag',
    index: '60',
    image: 'https://img.pokemondb.net/artwork/poliwag.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Its newly grown legs prevent it from running. It appears to prefer swimming than trying to stand.'
  },
  {
    name: 'Poliwhirl',
    index: '61',
    image: 'https://img.pokemondb.net/artwork/poliwhirl.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Capable of living in or out of water. When out of water, it sweats to keep its body slimy.'
  },
  {
    name: 'Poliwrath',
    index: '62',
    image: 'https://img.pokemondb.net/artwork/poliwrath.jpg',
    type1: 'Water',
    type2: 'Fighting',
    entry:
      'An adept swimmer at both the front crawl and breast stroke. Easily overtakes the best human swimmers.'
  },
  {
    name: 'Abra',
    index: '63',
    image: 'https://img.pokemondb.net/artwork/abra.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'Using its ability to read minds, it will identify impending danger and TELEPORT to safety.'
  },
  {
    name: 'Kadabra',
    index: '64',
    image: 'https://img.pokemondb.net/artwork/kadabra.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'It emits special alpha waves from its body that induce headaches just by being close by.'
  },
  {
    name: 'Alakazam',
    index: '65',
    image: 'https://img.pokemondb.net/artwork/alakazam.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.'
  },
  {
    name: 'Machop',
    index: '66',
    image: 'https://img.pokemondb.net/artwork/machop.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'Loves to build its muscles. It trains in all styles of martial arts to become even stronger.'
  },
  {
    name: 'Machoke',
    index: '67',
    image: 'https://img.pokemondb.net/artwork/machoke.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'Its muscular body is so powerful, it must wear a power save belt to be able to regulate its motions.'
  },
  {
    name: 'Machamp',
    index: '68',
    image: 'https://img.pokemondb.net/artwork/machamp.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'Using its heavy muscles, it throws powerful punches that can send the victim clear over the horizon.'
  },
  {
    name: 'Bellsprout',
    index: '69',
    image: 'https://img.pokemondb.net/artwork/bellsprout.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'A carnivorous POK\u00e9MON that traps and eats bugs. It uses its root feet to soak up needed moisture.'
  },
  {
    name: 'Weepinbell',
    index: '70',
    image: 'https://img.pokemondb.net/artwork/weepinbell.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'It spits out POISONPOWDER to immobilize the enemy and then finishes it with a spray of ACID.'
  },
  {
    name: 'Victreebel',
    index: '71',
    image: 'https://img.pokemondb.net/artwork/victreebel.jpg',
    type1: 'Grass',
    type2: 'Poison',
    entry:
      'Said to live in huge colonies deep in jungles, although no one has ever returned from there.'
  },
  {
    name: 'Tentacool',
    index: '72',
    image: 'https://img.pokemondb.net/artwork/tentacool.jpg',
    type1: 'Water',
    type2: 'Poison',
    entry:
      'Drifts in shallow seas. Anglers who hook them by accident are often punished by its stinging acid.'
  },
  {
    name: 'Tentacruel',
    index: '73',
    image: 'https://img.pokemondb.net/artwork/tentacruel.jpg',
    type1: 'Water',
    type2: 'Poison',
    entry:
      'The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey.'
  },
  {
    name: 'Geodude',
    index: '74',
    image: 'https://img.pokemondb.net/artwork/geodude.jpg',
    type1: 'Rock',
    type2: 'Ground',
    entry:
      'Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.'
  },
  {
    name: 'Graveler',
    index: '75',
    image: 'https://img.pokemondb.net/artwork/graveler.jpg',
    type1: 'Rock',
    type2: 'Ground',
    entry:
      'Rolls down slopes to move. It rolls over any obstacle without slowing or changing its direction.'
  },
  {
    name: 'Golem',
    index: '76',
    image: 'https://img.pokemondb.net/artwork/golem.jpg',
    type1: 'Rock',
    type2: 'Ground',
    entry:
      'Its boulder-like body is extremely hard. It can easily withstand dynamite blasts without damage.'
  },
  {
    name: 'Ponyta',
    index: '77',
    image: 'https://img.pokemondb.net/artwork/ponyta.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.'
  },
  {
    name: 'Rapidash',
    index: '78',
    image: 'https://img.pokemondb.net/artwork/rapidash.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'Very competitive, this POK\u00e9MON will chase anything that moves fast in the hopes of racing it.'
  },
  {
    name: 'Slowpoke',
    index: '79',
    image: 'https://img.pokemondb.net/artwork/slowpoke.jpg',
    type1: 'Water',
    type2: 'Psychic',
    entry:
      'Incredibly slow and dopey. It takes 5 seconds for it to feel pain when under attack.'
  },
  {
    name: 'Slowbro',
    index: '80',
    image: 'https://img.pokemondb.net/artwork/slowbro.jpg',
    type1: 'Water',
    type2: 'Psychic',
    entry:
      'The SHELLDER that is latched onto SLOWPOKE\u2019s tail is said to feed on the host\u2019s left over scraps.'
  },
  {
    name: 'Magnemite',
    index: '81',
    image: 'https://img.pokemondb.net/artwork/magnemite.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'Uses anti-gravity to stay suspended. Appears without warning and uses THUNDER WAVE and similar moves.'
  },
  {
    name: 'Magneton',
    index: '82',
    image: 'https://img.pokemondb.net/artwork/magneton.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'Formed by several MAGNEMITEs linked together. They frequently appear when sunspots flare up.'
  },
  {
    name: "Farfetch'd",
    index: '83',
    image: 'https://img.pokemondb.net/artwork/farfetchd.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'The sprig of green onions it holds is its weapon. It is used much like a metal sword.'
  },
  {
    name: 'Doduo',
    index: '84',
    image: 'https://img.pokemondb.net/artwork/doduo.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.'
  },
  {
    name: 'Dodrio',
    index: '85',
    image: 'https://img.pokemondb.net/artwork/dodrio.jpg',
    type1: 'Normal',
    type2: 'Flying',
    entry:
      'Uses its three brains to execute complex plans. While two heads sleep, one head stays awake.'
  },
  {
    name: 'Seel',
    index: '86',
    image: 'https://img.pokemondb.net/artwork/seel.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'The protruding horn on its head is very hard. It is used for bashing through thick ice.'
  },
  {
    name: 'Dewgong',
    index: '87',
    image: 'https://img.pokemondb.net/artwork/dewgong.jpg',
    type1: 'Water',
    type2: 'Ice',
    entry:
      'Stores thermal energy in its body. Swims at a steady 8 knots even in intensely cold waters.'
  },
  {
    name: 'Grimer',
    index: '88',
    image: 'https://img.pokemondb.net/artwork/grimer.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Appears in filthy areas. Thrives by sucking up polluted sludge that is pumped out of factories.'
  },
  {
    name: 'Muk',
    index: '89',
    image: 'https://img.pokemondb.net/artwork/muk.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison.'
  },
  {
    name: 'Shellder',
    index: '90',
    image: 'https://img.pokemondb.net/artwork/shellder.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.'
  },
  {
    name: 'Cloyster',
    index: '91',
    image: 'https://img.pokemondb.net/artwork/cloyster.jpg',
    type1: 'Water',
    type2: 'Ice',
    entry:
      'When attacked, it launches its horns in quick volleys. Its innards have never been seen.'
  },
  {
    name: 'Gastly',
    index: '92',
    image: 'https://img.pokemondb.net/artwork/gastly.jpg',
    type1: 'Ghost',
    type2: 'Poison',
    entry:
      'Almost invisible, this gaseous POK\u00e9MON cloaks the target and puts it to sleep without notice.'
  },
  {
    name: 'Haunter',
    index: '93',
    image: 'https://img.pokemondb.net/artwork/haunter.jpg',
    type1: 'Ghost',
    type2: 'Poison',
    entry:
      'Because of its ability to slip through block walls, it is said to be from another dimension.'
  },
  {
    name: 'Gengar',
    index: '94',
    image: 'https://img.pokemondb.net/artwork/gengar.jpg',
    type1: 'Ghost',
    type2: 'Poison',
    entry:
      'Under a full moon, this POK\u00e9MON likes to mimic the shadows of people and laugh at their fright.'
  },
  {
    name: 'Onix',
    index: '95',
    image: 'https://img.pokemondb.net/artwork/onix.jpg',
    type1: 'Rock',
    type2: 'Ground',
    entry:
      'As it grows, the stone portions of its body harden to become similar to a diamond, but colored black.'
  },
  {
    name: 'Drowzee',
    index: '96',
    image: 'https://img.pokemondb.net/artwork/drowzee.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'Puts enemies to sleep then eats their dreams. Occasionally gets sick from eating bad dreams.'
  },
  {
    name: 'Hypno',
    index: '97',
    image: 'https://img.pokemondb.net/artwork/hypno.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'When it locks eyes with an enemy, it will use a mix of PSI moves such as HYPNOSIS and CONFUSION.'
  },
  {
    name: 'Krabby',
    index: '98',
    image: 'https://img.pokemondb.net/artwork/krabby.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Its pincers are not only powerful weapons, they are used for balance when walking sideways.'
  },
  {
    name: 'Kingler',
    index: '99',
    image: 'https://img.pokemondb.net/artwork/kingler.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'The large pincer has 10000 hp of crushing power. However, its huge size makes it unwieldy to use.'
  },
  {
    name: 'Voltorb',
    index: '100',
    image: 'https://img.pokemondb.net/artwork/voltorb.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'Usually found in power plants. Easily mistaken for a POK\u00e9 BALL, they have zapped many people.'
  },
  {
    name: 'Electrode',
    index: '101',
    image: 'https://img.pokemondb.net/artwork/electrode.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'It stores electric energy under very high pressure. It often explodes with little or no provocation.'
  },
  {
    name: 'Exeggcute',
    index: '102',
    image: 'https://img.pokemondb.net/artwork/exeggcute.jpg',
    type1: 'Grass',
    type2: 'Psychic',
    entry:
      'Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms.'
  },
  {
    name: 'Exeggutor',
    index: '103',
    image: 'https://img.pokemondb.net/artwork/exeggutor.jpg',
    type1: 'Grass',
    type2: 'Psychic',
    entry:
      'Legend has it that on rare occasions, one of its heads will drop off and continue on as an EXEGGCUTE.'
  },
  {
    name: 'Cubone',
    index: '104',
    image: 'https://img.pokemondb.net/artwork/cubone.jpg',
    type1: 'Ground',
    type2: null,
    entry:
      'Because it never removes its skull helmet, no one has ever seen this POK\u00e9MON\u2019s real face.'
  },
  {
    name: 'Marowak',
    index: '105',
    image: 'https://img.pokemondb.net/artwork/marowak.jpg',
    type1: 'Ground',
    type2: null,
    entry:
      'The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets.'
  },
  {
    name: 'Hitmonlee',
    index: '106',
    image: 'https://img.pokemondb.net/artwork/hitmonlee.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.'
  },
  {
    name: 'Hitmonchan',
    index: '107',
    image: 'https://img.pokemondb.net/artwork/hitmonchan.jpg',
    type1: 'Fighting',
    type2: null,
    entry:
      'While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see.'
  },
  {
    name: 'Lickitung',
    index: '108',
    image: 'https://img.pokemondb.net/artwork/lickitung.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Its tongue can be extended like a chameleon\u2019s. It leaves a tingling sensation when it licks enemies.'
  },
  {
    name: 'Koffing',
    index: '109',
    image: 'https://img.pokemondb.net/artwork/koffing.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.'
  },
  {
    name: 'Weezing',
    index: '110',
    image: 'https://img.pokemondb.net/artwork/weezing.jpg',
    type1: 'Poison',
    type2: null,
    entry:
      'Where two kinds of poison gases meet, 2 KOFFINGs can fuse into a WEEZING over many years.'
  },
  {
    name: 'Rhyhorn',
    index: '111',
    image: 'https://img.pokemondb.net/artwork/rhyhorn.jpg',
    type1: 'Ground',
    type2: 'Rock',
    entry:
      'Its massive bones are 1000 times harder than human bones. It can easily knock a trailer flying.'
  },
  {
    name: 'Rhydon',
    index: '112',
    image: 'https://img.pokemondb.net/artwork/rhydon.jpg',
    type1: 'Ground',
    type2: 'Rock',
    entry:
      'Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees.'
  },
  {
    name: 'Chansey',
    index: '113',
    image: 'https://img.pokemondb.net/artwork/chansey.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'A rare and elusive POK\u00e9MON that is said to bring happiness to those who manage to get it.'
  },
  {
    name: 'Tangela',
    index: '114',
    image: 'https://img.pokemondb.net/artwork/tangela.jpg',
    type1: 'Grass',
    type2: null,
    entry:
      'The whole body is swathed with wide vines that are similar to seaweed. Its vines shake as it walks.'
  },
  {
    name: 'Kangaskhan',
    index: '115',
    image: 'https://img.pokemondb.net/artwork/kangaskhan.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'The infant rarely ventures out of its mother\u2019s protective pouch until it is 3 years old.'
  },
  {
    name: 'Horsea',
    index: '116',
    image: 'https://img.pokemondb.net/artwork/horsea.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Known to shoot down flying bugs with precision blasts of ink from the surface of the water.'
  },
  {
    name: 'Seadra',
    index: '117',
    image: 'https://img.pokemondb.net/artwork/seadra.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Capable of swimming backwards by rapidly flapping its wing-like pectoral fins and stout tail.'
  },
  {
    name: 'Goldeen',
    index: '118',
    image: 'https://img.pokemondb.net/artwork/goldeen.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen.'
  },
  {
    name: 'Seaking',
    index: '119',
    image: 'https://img.pokemondb.net/artwork/seaking.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks.'
  },
  {
    name: 'Staryu',
    index: '120',
    image: 'https://img.pokemondb.net/artwork/staryu.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'An enigmatic POK\u00e9MON that can effortlessly regenerate any appendage it loses in battle.'
  },
  {
    name: 'Starmie',
    index: '121',
    image: 'https://img.pokemondb.net/artwork/starmie.jpg',
    type1: 'Water',
    type2: 'Psychic',
    entry:
      'Its central core glows with the seven colors of the rainbow. Some people value the core as a gem.'
  },
  {
    name: 'Mr.Mime',
    index: '122',
    image: 'https://img.pokemondb.net/artwork/mr-mime.jpg',
    type1: 'Psychic',
    type2: 'Normal',
    entry:
      'If interrupted while it is miming, it will slap around the offender with its broad hands.'
  },
  {
    name: 'Scyther',
    index: '123',
    image: 'https://img.pokemondb.net/artwork/scyther.jpg',
    type1: 'Bug',
    type2: 'Flying',
    entry:
      'With ninja-like agility and speed, it can create the illusion that there is more than one.'
  },
  {
    name: 'Jynx',
    index: '124',
    image: 'https://img.pokemondb.net/artwork/jynx.jpg',
    type1: 'Ice',
    type2: 'Psychic',
    entry:
      'It seductively wiggles its hips as it walks. It can cause people to dance in unison with it.'
  },
  {
    name: 'Electabuzz',
    index: '125',
    image: 'https://img.pokemondb.net/artwork/electabuzz.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'Normally found near power plants, they can wander away and cause major blackouts in cities.'
  },
  {
    name: 'Magmar',
    index: '126',
    image: 'https://img.pokemondb.net/artwork/magmar.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'Its body always burns with an orange glow that enables it to hide perfectly among flames.'
  },
  {
    name: 'Pinsir',
    index: '127',
    image: 'https://img.pokemondb.net/artwork/pinsir.jpg',
    type1: 'Bug',
    type2: null,
    entry:
      'If it fails to crush the victim in its pincers, it will swing it around and toss it hard.'
  },
  {
    name: 'Tauros',
    index: '128',
    image: 'https://img.pokemondb.net/artwork/tauros.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'When it targets an enemy, it charges furiously while whipping its body with its long tails.'
  },
  {
    name: 'Magikarp',
    index: '129',
    image: 'https://img.pokemondb.net/artwork/magikarp.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'In the distant past, it was somewhat stronger than the horribly weak descendants that exist today.'
  },
  {
    name: 'Gyarados',
    index: '130',
    image: 'https://img.pokemondb.net/artwork/gyarados.jpg',
    type1: 'Water',
    type2: 'Flying',
    entry:
      'Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.'
  },
  {
    name: 'Lapras',
    index: '131',
    image: 'https://img.pokemondb.net/artwork/lapras.jpg',
    type1: 'Water',
    type2: 'Ice',
    entry:
      'A POK\u00e9MON that has been overhunted almost to extinction. It can ferry people across the water.'
  },
  {
    name: 'Ditto',
    index: '132',
    image: 'https://img.pokemondb.net/artwork/ditto.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Capable of copying an enemy\u2019s genetic code to instantly transform itself into a duplicate of the enemy.'
  },
  {
    name: 'Eevee',
    index: '133',
    image: 'https://img.pokemondb.net/artwork/eevee.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Its genetic code is irregular. It may mutate if it is exposed to radiation from element STONEs.'
  },
  {
    name: 'Vaporeon',
    index: '134',
    image: 'https://img.pokemondb.net/artwork/vaporeon.jpg',
    type1: 'Water',
    type2: null,
    entry:
      'Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid\u2019s.'
  },
  {
    name: 'Jolteon',
    index: '135',
    image: 'https://img.pokemondb.net/artwork/jolteon.jpg',
    type1: 'Electric',
    type2: null,
    entry:
      'It accumulates negative ions in the atmosphere to blast out 10000-volt lightning bolts.'
  },
  {
    name: 'Flareon',
    index: '136',
    image: 'https://img.pokemondb.net/artwork/flareon.jpg',
    type1: 'Fire',
    type2: null,
    entry:
      'When storing thermal energy in its body, its temperature could soar to over 1600 degrees.'
  },
  {
    name: 'Porygon',
    index: '137',
    image: 'https://img.pokemondb.net/artwork/porygon.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'A POK\u00e9MON that consists entirely of programming code. Capable of moving freely in cyberspace.'
  },
  {
    name: 'Omanyte',
    index: '138',
    image: 'https://img.pokemondb.net/artwork/omanyte.jpg',
    type1: 'Rock',
    type2: 'Water',
    entry:
      'Although long extinct, in rare cases, it can be genetically resurrected from fossils.'
  },
  {
    name: 'Omastar',
    index: '139',
    image: 'https://img.pokemondb.net/artwork/omastar.jpg',
    type1: 'Rock',
    type2: 'Water',
    entry:
      'A prehistoric POK\u00e9MON that died out when its heavy shell made it impossible to catch prey.'
  },
  {
    name: 'Kabuto',
    index: '140',
    image: 'https://img.pokemondb.net/artwork/kabuto.jpg',
    type1: 'Rock',
    type2: 'Water',
    entry:
      'A POK\u00e9MON that was resurrected from a fossil found in what was once the ocean floor eons ago.'
  },
  {
    name: 'Kabutops',
    index: '141',
    image: 'https://img.pokemondb.net/artwork/kabutops.jpg',
    type1: 'Rock',
    type2: 'Water',
    entry:
      'Its sleek shape is perfect for swimming. It slashes prey with its claws and drains the body fluids.'
  },
  {
    name: 'Aerodactyl',
    index: '142',
    image: 'https://img.pokemondb.net/artwork/aerodactyl.jpg',
    type1: 'Rock',
    type2: 'Flying',
    entry:
      'A ferocious, prehistoric POK\u00e9MON that goes for the enemy\u2019s throat with its serrated saw-like fangs.'
  },
  {
    name: 'Snorlax',
    index: '143',
    image: 'https://img.pokemondb.net/artwork/snorlax.jpg',
    type1: 'Normal',
    type2: null,
    entry:
      'Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.'
  },
  {
    name: 'Articuno',
    index: '144',
    image: 'https://img.pokemondb.net/artwork/articuno.jpg',
    type1: 'Ice',
    type2: 'Flying',
    entry:
      'A legendary bird POK\u00e9MON that is said to appear to doomed people who are lost in icy mountains.'
  },
  {
    name: 'Zapdos',
    index: '145',
    image: 'https://img.pokemondb.net/artwork/zapdos.jpg',
    type1: 'Electric',
    type2: 'Flying',
    entry:
      'A legendary bird POK\u00e9MON that is said to appear from clouds while dropping enormous lightning bolts.'
  },
  {
    name: 'Moltres',
    index: '146',
    image: 'https://img.pokemondb.net/artwork/moltres.jpg',
    type1: 'Fire',
    type2: 'Flying',
    entry:
      'Known as the legendary bird of fire. Every flap of its wings creates a dazzling flash of flames.'
  },
  {
    name: 'Dratini',
    index: '147',
    image: 'https://img.pokemondb.net/artwork/dratini.jpg',
    type1: 'Dragon',
    type2: null,
    entry:
      'Long considered a mythical POK\u00e9MON until recently when a small colony was found living underwater.'
  },
  {
    name: 'Dragonair',
    index: '148',
    image: 'https://img.pokemondb.net/artwork/dragonair.jpg',
    type1: 'Dragon',
    type2: null,
    entry:
      'A mystical POK\u00e9MON that exudes a gentle aura. Has the ability to change climate conditions.'
  },
  {
    name: 'Dragonite',
    index: '149',
    image: 'https://img.pokemondb.net/artwork/dragonite.jpg',
    type1: 'Dragon',
    type2: 'Flying',
    entry:
      'An extremely rarely seen marine POK\u00e9MON. Its intelligence is said to match that of humans.'
  },
  {
    name: 'Mewtwo',
    index: '150',
    image: 'https://img.pokemondb.net/artwork/mewtwo.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.'
  },
  {
    name: 'Mew',
    index: '151',
    image: 'https://img.pokemondb.net/artwork/mew.jpg',
    type1: 'Psychic',
    type2: null,
    entry:
      'So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.'
  }
];

export default pokemon;
