const days = [
  {
    id: 'one',
    active: false,
    value: '1',
    data: {
      day: 'Day 1',
      title: 'HOW DO YOU SPEAK TO YOURSELF?',
      content:
        'Our self-esteem and decision-making are greatly influenced by how we speak to ourselves. Many of us say some of the most hurtful things to ourselves without even realizing it. However, words have power, and after hearing something enough times, one begins to believe it! This influences your emotions and how you interact with others and see yourself. So, take some time to think about your self-talk. For example: When you make a mistake, do you immediately call yourself stupid? Or do you constantly repeat phrases like "Oh, I am a loser."? Would you speak to someone you love the way you talk to yourself?',
      questionList: [
        {id: 'q1', value: 'What do I say about myself?'},
        {id: 'q2', value: 'But are those things true?'},
      ],
    },
  },
  {
    id: 'two',
    active: false,
    value: '2',
    data: {
      day: 'Day 2',
      title: 'PRIORITIES VS PROCASTINATION',
      content:
        "When it comes to self-love, many of us quickly find excuses for why we can't. Self-care may seem unimportant, selfish, or a waste of time in certain situations. But putting off self-care means you aren't prioritizing yourself as you should. You can only go so long without doing anything to help yourself. Would you ever drive your car without filling it up with gas? Likely not! Even if you did, it would stop when the gas ran out. Then you would be stuck wherever it broke down, making it even harder to get the gas you should have put in the first place. You must take care of yourself first to do things as well as possible.",
      questionList: [
        {id: 'q1', value: 'What is your regular everyday routine?'},
        {
          id: 'q2',
          value:
            'What nonproductive activities consume your time, which don’t add value to your mental or physical health?',
        },
        {
          id: 'q3',
          value:
            'In order of priorities; list what needs to be done in your regular day with focus.',
        },
        {
          id: 'q4',
          value:
            'Now find a time slot dedicated to self-care routine in your day',
        },
        {
          id: 'q5',
          value:
            'List a few self-care activities that you can do everyday in that time. i.e exercise, skin care routine, meditation.',
        },
      ],
    },
  },
  {
    id: 'three',
    active: false,
    value: '3',
    data: {
      day: 'Day 3',
      title: 'HOW ARE YOU FEELING?',
      content:
        "As you begin to work through some of the thoughts and mental blocks that stop you from taking care of yourself, it will bring up a lot of mixed feelings. It may even bring up past traumas or experiences that have changed how you care for yourself. Therapy is a great way to work through deep-seated problems, but journaling is also a great way to work through things yourself. Since you started caring for yourself, have you noticed those specific thoughts or feelings come up more often? Have any memories come to mind that help you figure out why self-care may not have been as important to you in the past? Or perhaps none of this is happening, and you feel good and balanced about embarking on this journey. No matter what, use this space, to be honest with yourself and be mindful of how you've felt since the first day you started this journal.",
      questionList: [
        {id: 'q1', value: 'What is your regular everyday routine?'},
        {
          id: 'q2',
          value:
            'What nonproductive activities consume your time, which don’t add value to your mental or physical health?',
        },
        {
          id: 'q3',
          value:
            'In order of priorities; list what needs to be done in your regular day with focus.',
        },
        {
          id: 'q4',
          value:
            'Now find a time slot dedicated to self-care routine in your day',
        },
        {
          id: 'q5',
          value:
            'List a few self-care activities that you can do everyday in that time. i.e exercise, skin care routine, meditation.',
        },
      ],
    },
  },
  {
    id: 'four',
    active: false,
    value: '4',
    data: {
      day: 'Day 4',
      title: 'SELF CARE, GET UP AND MOVE',
      content:
        "Self-care is all about loving yourself in healthy ways. It should not feel like a chore or something you dread. When these feelings arise, it is usually because your mindset is still off. Remember, you are doing this for YOU and YOU ONLY. Self-care is a component of loving yourself, and there are many simple ways to practice self-care. It doesn't have to be a big show or anything extraordinary. Begin small and take each day as it comes. Here are some simple self-care ideas to get you started. Take a look and try a few. You can also come up with a few of your own.",
      options: [
        {id: 'o1', value: 'Deep breathing', active: false},
        {id: 'o2', value: 'Find a happy memory', active: false},
        {id: 'o3', value: 'Tell yourself you are awesome', active: false},
        {id: 'o4', value: 'Drink water', active: false},
        {id: 'o5', value: 'Stretch', active: false},
        {id: 'o6', value: 'Go outside sit in sun', active: false},
        {id: 'o7', value: 'Call a friend', active: false},
        {id: 'o8', value: 'Share a meme', active: false},
        {id: 'o9', value: 'Buy yourself a plant or a pet', active: false},
        {
          id: 'o10',
          value: 'Have a phone-free night with family/loved ones',
          active: false,
        },
      ],
    },
  },
  {
    id: 'five',
    active: false,
    value: '5',
    data: {
      day: 'Day 5',
      title: 'DECLUTTER YOUR ROOM, PERSONAL HYGIENE, SLEEP',
      content:
        'Today will be about something very basic but very important, which when left uncared for, adds to the misery and is observed in almost everyone who is struggling, that is, personal hygiene and health. Self-love is as much about physical well-being as mental.',
      options: [
        {
          id: 'o1',
          value: 'Make up your bed every morning after you wake up',
          active: false,
        },
        {
          id: 'o2',
          value:
            'Spend a day deep cleaning, make it fun, entertain yourself with music or a show',
          active: false,
        },
        {id: 'o3', value: 'Get a hair cut', active: false},
        {id: 'o4', value: 'Trim your nails', active: false},
        {
          id: 'o5',
          value: 'Experiment and have fun with makeup or outfits',
          active: false,
        },
        {id: 'o6', value: 'Aim for 6 – 8 hours of sleep daily', active: false},
        {
          id: 'o7',
          value: 'Unplugging one hour in advance i.e no screens in bed',
          active: false,
        },
        {
          id: 'o8',
          value: 'Avoid caffeine and sugar for 3-5 hours before bed.',
          active: false,
        },
        {
          id: 'o9',
          value:
            'Avoid CNS stimulants like tea, coffee or chocolate after 5 pm.',
          active: false,
        },
        {
          id: 'o10',
          value: 'Eat dinner 2 hours before bedtime.',
          active: false,
        },
        {
          id: 'o11',
          value:
            'Set a bedtime ritual - go to bed and wake up at same time +- 30 min.',
          active: false,
        },
      ],
    },
  },
  {
    id: 'six',
    active: false,
    value: '6',
    data: {
      day: 'Day 6',
      title: 'EXERCISE, DIET, SCHEDULE HEALTH CHECKUP',
      content:
        'Diet and exercise are some of the most underrated self-love tasks that will help you immensely. Fixing both together will not only improve the mental state of mind by reducing anxiety and depression but also helps with controlling anger and boosting self-esteem.Diet and exercise are two of the most underappreciated self-love tasks that will significantly benefit you. Fixing both at the same time not only improves mental health by lowering anxiety and depression but also aids in anger management and boosting self-esteem. Also, schedule your annual checkup; you owe it to your physical self.',
      options: [
        {
          id: 'o1',
          value:
            'If you don’t have a workout schedule start with the exercise modules in the app',
          active: false,
        },
        {
          id: 'o2',
          value:
            'Make a meal plan for yourself, replace junk food with nutritious healthy meals',
          active: false,
        },
        {
          id: 'o3',
          value:
            'Drink half the number in ounces of your body weight in Lb, e.g if you are 100 lb drink 50 ounces.',
          active: false,
        },
        {id: 'o4', value: 'Trim your nails', active: false},
        {
          id: 'o5',
          value:
            'Schedule your annual health checkup. Prevention is the best cure.',
          active: false,
        },
      ],
    },
  },
  {
    id: 'seven',
    active: false,
    value: '7',
    data: {
      day: 'Day 7',
      title: 'SELF LOVE GOALS',
      content:
        "What are some of the goals you have in mind that you would like to achieve in the near or distant future? It could be anything from personal improvement to changing the world. There may have been some hobby you always wanted to take up but couldn't because of a lack of resources or time. Let's write them down and think about how you can achieve them.",
      options: [
        {
          id: 'o1',
          value: 'I am strong.',
          active: false,
        },
        {
          id: 'o2',
          value: 'I am smart.',
          active: false,
        },
        {
          id: 'o3',
          value: 'I am worthy of love.',
          active: false,
        },
        {id: 'o4', value: 'I love myself.', active: false},
        {
          id: 'o5',
          value: 'I can handle anything that comes my way today.',
          active: false,
        },
        {id: 'o6', value: 'Aim for 6 – 8 hours of sleep daily', active: false},
        {
          id: 'o7',
          value: 'I am capable.',
          active: false,
        },
        {
          id: 'o8',
          value: 'I will succeed today.',
          active: false,
        },
        {
          id: 'o9',
          value: 'I will no give up.',
          active: false,
        },
        {
          id: 'o10',
          value: 'I will worry less',
          active: false,
        },
        {
          id: 'o11',
          value: 'I will not internalize other people’s opinion',
          active: false,
        },
        {
          id: 'o12',
          value: 'What is your favorite thing about yourself.',
          active: false,
        },
      ],
    },
  },
  {
    id: 'eight',
    active: false,
    value: '8',
    data: {
      day: 'Day 8',
      title: 'CONFRONT DOUBTS AND FEARS',
      content:
        "Let's keep moving forward and not give up now because you have already done a lot of work, and is time now to break down all the remaining barriers holding you back. Write down any doubts you still have and cross them out. Follow up with writing down the opposite of the doubts to change their perception.",
      questionList: [
        {id: 'q1', value: 'Write down your fears and doubts.'},
        {
          id: 'q2',
          value: 'Now write the opposite of those doubts.',
        },
      ],
    },
  },
  {
    id: 'nine',
    active: false,
    value: '9',
    data: {
      day: 'Day 9',
      title: 'PRACTICE MINDFULLNESS',
      content:
        "Mindfulness is often overlooked, but it is crucial for our mental health. It is a valuable tool as it lets us live in the present moment, helping us notice what's happening around us without judging or expecting anything. When you're in the moment, you're aware of what's happening around you and your thoughts and feelings. This can significantly affect your life because it will let you deal with what is happening right now instead of living in fear or worrying about things that haven't happened yet and might not happen at all. It also helps reduce stress and improve overall health.",
      options: [
        {
          id: 'o1',
          value:
            'Start the exercise in a sitting of lying position from the toes',
          active: false,
        },
        {
          id: 'o2',
          value: 'Take a few deep breaths to slow down.',
          active: false,
        },
        {
          id: 'o3',
          value:
            'Lift or tense the toes for 5 seconds and then relax for 30 seconds; repeat the same with calf muscles, progressing onto knees, squeeze the knees together for 5 seconds and then relax for 30 seconds.',
          active: false,
        },
        {
          id: 'o4',
          value:
            'Squeeze thigh muscles next and then relax, squeeze the buttocks, and relax. ',
          active: false,
        },
        {
          id: 'o5',
          value: 'Tense up the abdominals and relax. ',
          active: false,
        },
        {
          id: 'o6',
          value:
            'Spread fingertips wide for 5 seconds then relax. Make fists,  relax, squeeze the ribcage between arms and relax. Take a deep breath, hold; relax. ',
          active: false,
        },
        {
          id: 'o7',
          value:
            'Shrug shoulders upto ears, hold for 5 seconds and relax for 30 seconds',
          active: false,
        },
        {
          id: 'o8',
          value:
            'Purse lips together; relax. Open mouth wide; relax. Lift eyebrows; relax.',
          active: false,
        },
        {
          id: 'o9',
          value: 'I will no give up.',
          active: false,
        },
        {
          id: 'o10',
          value: 'I will worry less',
          active: false,
        },
        {
          id: 'o11',
          value: 'I will not internalize other people’s opinion',
          active: false,
        },
        {
          id: 'o12',
          value: 'What is your favorite thing about yourself.',
          active: false,
        },
      ],
    },
  },
  {
    id: 'ten',
    active: false,
    value: '10',
    data: {
      day: 'Day 10',
      title: 'REFLECTION DAY',
      content:
        "Find stillness and take a moment to reflect on all the work you have done for the past 9 days. All that momentum has led you here. It doesn't matter what tomorrow brings; let yourself enjoy this present moment.",
      options: [
        {
          id: 'o1',
          value: 'Keep using positive pronouns for yourself.',
          active: false,
        },
        {
          id: 'o2',
          value: 'Rethink your priorities.',
          active: false,
        },
        {
          id: 'o3',
          value: 'Shed the doubts',
          active: false,
        },
        {
          id: 'o4',
          value:
            'Focus on decluttering your physical space and consciousness. ',
          active: false,
        },
        {
          id: 'o5',
          value: 'Exercise, breathe, drink, and sleep. ',
          active: false,
        },
        {
          id: 'o6',
          value:
            'Take a few minutes to practice mindfulness and progressive muscle relaxation. ',
          active: false,
        },
      ],
    },
  },
  {
    id: 'eleven',
    active: false,
    value: '11',
    data: {
      day: 'Day 11',
      title: 'TRAUMATIC EVENTS AND COPING',
      content:
        "We've all had experiences that we'd rather not think about. However, whether we like it or not, these things impact our present. If we never deal with them, the consequences are usually unpleasant. It could be a traumatic event, a poorly conducted conversation, or a mistake; it's crucial to go back and make peace with it. This will allow you to move forward and lay a healthier foundation for your future. It may not be easy; sometimes, seeing a therapist can help. As you work through these prompts, consider seeking outside assistance.",
      questionList: [
        {id: 'q1', value: 'What are some of the major regrets you have?'},
        {
          id: 'q2',
          value: 'major trauma that you experienced?',
        },
        {
          id: 'q3',
          value: 'What kind of impact have they had on you?',
        },
        {
          id: 'q4',
          value: 'have you made peace with them?',
        },
        {
          id: 'q5',
          value:
            'What advice would you give someone you care about that has gone through the same thing?',
        },
        {
          id: 'q6',
          value:
            'Have you taken that advice yourself?/ Have you personally acted on that advice?',
        },
        {
          id: 'q7',
          value: 'Would you consider going to therapy?',
        },
        {
          id: 'q8',
          value: 'Why or why not?',
        },
      ],
    },
  },
  {
    id: 'twelve',
    active: false,
    value: '12',
    data: {
      day: 'Day 12',
      title: 'HOW DO YOU REACT TO OTHER PEOPLE’S EMOTIONS?',
      content:
        "Believe it or not, other people's emotions can significantly impact you and how you live your life. Balance is essential, and while you should be aware of others, you should not take everything they feel or say personally. Taking on other people's feelings on top of your own is a surefire way to get burned out. It also makes it hard to keep your emotions in check, which we've learned is essential this week. Of course, it's great if someone is happy with you, but it doesn't mean you need to compromise your well-being to keep them happy. On the other hand, handling a negative emotion expressed toward you is a learned skill. If you are at fault, accept responsibility, make amends, and move on. However, don't hold onto that negativity and guilt for too long. Forgive yourself, even if they don't, as long as you did everything you could to make it right. Everyone is struggling with their problems, and it's crucial to understand that you may be the unfortunate person to whom they project their problems. Use this space to think about how you deal with other people's emotions, whether directed at you or not.",
      questionList: [
        {
          id: 'q1',
          value: 'How do you respond when someone criticizes you negatively?',
        },
        {
          id: 'q2',
          value: 'Why?',
        },
        {
          id: 'q3',
          value: 'Is this response appropriate?',
        },
        {
          id: 'q4',
          value:
            'How do you respond when someone expresses a positive feeling towards you?',
        },
        {
          id: 'q5',
          value: 'why?',
        },
        {
          id: 'q6',
          value: 'Is this response appropriate?',
        },
        {
          id: 'q7',
          value: 'If not, what can you do differently?',
        },
        {
          id: 'q8',
          value: 'How do you respond to positive environment around you?',
        },
        {
          id: 'q9',
          value: 'why?',
        },
        {
          id: 'q10',
          value: 'is this response appropriate',
        },
        {
          id: 'q11',
          value: 'If not, what can you do differently?',
        },
      ],
    },
  },
  {
    id: 'thirteen',
    active: false,
    value: '13',
    data: {
      day: 'Day 13',
      title: ' POSITIVE THINKING',
      content:
        'From bad news to bad weather to personal problems and everything in between, it can become overwhelming sometimes. While we should not completely ignore negativity around us, we should also avoid focusing on it all the time. Accepting setbacks and moving on is the healthiest way to deal with them. Dwelling on them can spiral you into depression, rage, and even more negativity. Even in the darkest of times, there is always something positive you can lean on to keep going forward. Learn to appreciate even the slightest good in the midst of the worst. This will allow you to carry inner peace with you and strengthen you as you go through the rest of your life.',
      questionList: [
        {
          id: 'q1',
          value:
            'What negative experiences have you found yourself focused on for a long time? (long term negativity)',
        },
        {
          id: 'q2',
          value:
            'What recent negative experiences have you been concentrating on?/ (new acquired negativity)?',
        },
        {
          id: 'q3',
          value: '(long term positives)',
        },
        {
          id: 'q4',
          value:
            'What are some good things that have happened to you recently?',
        },
        {
          id: 'q5',
          value: 'Net impact on your future',
        },
        {
          id: 'q6',
          value:
            'What is preventing you from shifting from a negative to a positive frame of mind?',
        },
        {
          id: 'q7',
          value:
            'Is this Describe one or more situations when things seemed bad and turned out for the better. appropriate?',
        },
        {
          id: 'q8',
          value:
            'Do you promise to make an effort to be happier?/ Do you intend to try to be more positive?',
        },
        {
          id: 'q9',
          value: 'Write down that commitment here:',
        },
      ],
    },
  },
  {
    id: 'fourteen',
    active: false,
    value: '14',

    data: {
      day: 'Day 14',
      title: 'ALLOW SPACE FOR YOUR FEELINGS',
      content:
        "Yesterday's practice of focusing on the positives does not imply that you should not allow yourself to feel anything negative. Feeling your genuine emotions is HEALTHY. What is unhealthy is concentrating on just one emotion. This includes both positive and negative emotions. Every day, we experience hundreds of emotions due to the stimuli we encounter. We constantly process everything we encounter throughout the day, whether from a social media post, work, friends, family, etc. This produces a wide range of emotions in a short period. It can be challenging to process all these emotions as they arise, but you must. Allowing yourself to accept and let go of emotions can cause you to suppress your feelings subconsciously. This can result in a variety of health problems, both mentally and physically. Use the space to the right to reflect on how you process your emotions and whether you should improve how you allow room for your feelings. Rate each emotion, and then write down why you allow or don't allow each one.",
      multipleChoice: [
        {
          id: 'm1',
          value: 'Anxiety',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm2',
          value: 'Anger',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm3',
          value: 'Contentment',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm4',
          value: 'Happiness',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm5',
          value: 'Love',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm6',
          value: 'Grief',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm7',
          value: 'Sadness',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm8',
          value: 'Self-Hostility',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm9',
          value: 'Shame',
          state: {low: false, medium: false, high: false},
        },
        {
          id: 'm10',
          value: 'Shyness/insecurity',
          state: {low: false, medium: false, high: false},
        },
      ],
    },
  },
  {
    id: 'fifteen',
    active: false,
    value: '15',
    data: {
      day: 'Day 15',
      title: 'ACCEPTANCE-2023 IS THE YEAR TO LET GO OF IMPOSTER SYNDROME',
      content:
        "Self-care isn't complete without self-acceptance. Self-acceptance means that you know and are okay with who you are. That means accepting the good, the bad and the ugly.",
      questionList: [
        {
          id: 'q1',
          value: 'I feel good about myself when?',
        },
        {
          id: 'q2',
          value: 'I am proud of 9 for?',
        },
        {
          id: 'q3',
          value: 'I have accomplished in the last year?',
        },
        {
          id: 'q4',
          value: 'Write down your perceived flaws?',
        },
        {
          id: 'q5',
          value: 'List one thing to let go.',
        },
      ],
    },
  },
  {
    id: 'sixteen',
    active: false,
    value: '16',
    data: {
      day: 'Day 16',
      title: 'People who support vs those who discourage.',
      content:
        "Our relationships reflect what we choose and think we deserve for ourselves. This means that how you let people treat you sets the bar for how you treat yourself. How do the people in your life make you feel about yourself? Do they make you feel better, lighter, and more refreshed? Or do you feel drained and tired after being around them, and you wish you hadn't? If most of the answers are negative, it might be time to eliminate some people in your circle. Most of our association is with friends, family, and coworkers. Now amongst them the people who lift you up or bring you down. Write down why you put each person in the spot you did.For this task, be very honest with yourself.”",
    },
  },
  {
    id: 'seventeen',
    active: false,
    value: '17',
    data: {
      day: 'Day 17',
      title: "Defining Boundaries: It's time to set limits.",
      content:
        'Boundaries are an essential component of self-care. You must establish and maintain them with yourself and those around you. A boundary might range from merely declining a request to outright refusing to allow something to occur in your presence. Allow no one to speak down to you, disrespect you, lie to you, or abuse you. This is a GOOD and HEALTHY habit to develop. You do not deserve to be used and have the right to draw the line against it decisively. Initially, it will be challenging, especially if you avoid confrontations; nonetheless, it is critical to your self-care path. Understanding your worth allows you to recognize and address situations where others do not. Review the Negative list from yesterday and write out what put each person there. Be as descriptive as possible, and then determine what you can do to address each of these inappropriate actions.(NOTE: If you believe that confronting or addressing people might put you in danger, it is usually relatively simple to end relationships that continue to drag you down instead of talking to them)',
    },
  },
  {
    id: 'eighteen',
    active: false,
    value: '18',
    data: {
      day: 'Day 18',
      title: 'WHEN TO LET PEOPLE GO, SET TIMELINE',
      content:
        "Some of the items on your list from yesterday most likely included talking to people who make you feel bad. However, this isn't always enough to shift people's attitudes toward you. This is why knowing when to let go becomes critical. You may wish to communicate with these negative people to allow them to change. This is acceptable, but you must ensure they respect your boundaries and tell them how their behaviour affects you in a non-confrontational, constructive manner. Most people are unaware of their behaviour and will change as soon as they become aware. Keep in mind that this is the majority of people's reaction. Some will refuse to respect your boundaries. These are the people you must let go of. The process of letting go is different for each person. You may gradually reduce the number of times you see them until they fall out of your circle. You can also take a more direct approach and remove them from all social media and in-person interactions. You must, nevertheless, do it when necessary. Know that you can choose who comes into your circle and that you deserve to be treated with the same respect you give to others.Note: If you are being physically assaulted or believe your life is in danger, notify your local authorities immediately and relocate to a safe location if feasible. Outside of physically violent and potentially dangerous situations, it is usually relatively simple to end relationships that continue dragging people down.",
      questionList: [
        {
          id: 'q1',
          value:
            "How many chances will you give someone before deciding it's time to let them go?",
        },
        {
          id: 'q2',
          value:
            "How do you respond when someone crosses a line that you've drawn?",
        },
        {
          id: 'q3',
          value: 'What actions warrant complete cut off?',
        },
        {
          id: 'q4',
          value: 'what is your process for letting people go?',
        },
        {
          id: 'q5',
          value:
            'Do you have difficulty letting people go despite their unacceptable and harmful behavior?',
        },
        {
          id: 'q6',
          value: 'why?',
        },
        {
          id: 'q7',
          value:
            'If a close friend of yours was being treated the way you are, what advice would you give them?',
        },
        {
          id: 'q8',
          value:
            'Would you implement the same advice in your own life? Yes or no, why?',
        },
      ],
    },
  },
  {
    id: 'nineteen',
    active: false,
    value: '19',
    data: {
      day: 'Day 19',
      title: 'SETTING BOUNDARIES WITH FAMILY',
      content:
        "Family is likely the most challenging group to deal with when setting limits. However, it is crucial to hold them to the same standards as the rest of your circle. Unfortunately, family members are often held least responsible for their actions, even though they are most likely to hurt. Therefore, discussing your limits, feelings, and needs with your family is essential. Getting everything out in the open can sometimes be difficult, but it's well worth it! Keeping things inside and letting them fester can lead to unhealthy outbursts or fights. If it's hard for you to talk to your family about how you feel, use the space below to figure out why and how you can work on opening that line of communication. Doing this and sticking to it will help you have better relationships with your family and give you the confidence to care for and love them.",
      questionList: [
        {
          id: 'q1',
          value:
            'Which member of your family do you find it most difficult to communicate with?',
        },
        {
          id: 'q2',
          value:
            'what would you say to them if you weren’t afraid, angry or disappointed? / What would you say to them if you were able to speak freely?',
        },
        {
          id: 'q3',
          value:
            'How can you improve your communication with this family member to help them respect your boundaries?',
        },
      ],
    },
  },
  {
    id: 'twenty',
    active: false,
    value: '20',
    data: {
      day: 'Day 20',
      title: 'Even love needs self-care.',
      content:
        "Many people find themselves in romantic relationships at some point in their lives. However, self-care is an essential component of a healthy romance. The better you understand how to care for yourself, the better prepared you will be to care for your partner. Whether you're looking for or are currently in love, a little self-care can't hurt! When you take care of yourself, you can be more open, positive, nurturing, and healthy in your relationship. Self-care can also help you figure out what you want and need in a love relationship. It can also show you how you and your partner can practice self-care together and become healthier. Whether in a relationship or not, use this section to state what you desire from a romantic connection and what you can bring to the table. Also, what you would like to talk to your partner about improving your relationship.",
      questionList: [
        {
          id: 'q1',
          value:
            'How is your relationship with your romantic partner? If you are single, how do you envision the future relationship?',
        },
        {
          id: 'q2',
          value: 'What boundaries are important for you in a relationship?',
        },
        {
          id: 'q3',
          value: 'How do you communicate with your partner?',
        },
        {
          id: 'q4',
          value: 'Do you give space for individual growth?',
        },
        {
          id: 'q5',
          value: 'what have you done to support each other’s dreams?',
        },
        {
          id: 'q6',
          value:
            'how often do you crave out individual time for each other or go on date nights?',
        },
        {
          id: 'q7',
          value: 'How can you improve?',
        },
      ],
    },
  },
  {
    id: 'twentyone',
    active: false,
    value: '21',
    data: {
      day: 'Day 21',
      title: 'BE KIND',
      content:
        "While it is important to stand up for yourself and set limits with individuals in your circle, it is equally necessary to conduct yourself in a way that earns that kind of respect. You can't be rude and unpleasant and expect people to reciprocate. How you treat others reflects how you feel about yourself, much like how you allow others to treat you.",
      questionList: [
        {
          id: 'q1',
          value: 'how do you handle your friendships?',
        },
        {
          id: 'q2',
          value: 'How do you treat your coworkers?',
        },
        {
          id: 'q3',
          value: 'How do you treat your family?',
        },
        {
          id: 'q4',
          value:
            'How do you treat people in the service industry? (Servers, waiters, customer service, janitors, etc)',
        },
        {
          id: 'q5',
          value: 'How can you improve, if needed?',
        },
      ],
    },
  },
  {
    id: 'twentytwo',
    active: false,
    value: '22',
    data: {
      day: 'Day 22',
      title: 'REFLECTION DAY',
      content:
        'A new week is here, let’s reflect on how far we have come on this journey.We are learning to take care of our physical and mental health by tidying up our mental and physical space. Have you had your doctor’s appointments set up yet? Are your muscles and joints re-gaining strength and mobility as you exercise more frequently? Do you like how exercise makes you feel?Now that you are more mindful, think back on how you expressed your emotions in the past week and was there any changes that you noticed in your expression and reaction to negative and positive feelings.Thinking positively is also an art which like all art forms is perfected by frequent practice. What negative thoughts have you rethought into positive outcomes in the past week?Kudos on recognizing and enforcing healthy boundaries with yourself, friends, and family. And letting go of the people who don’t add value or are detrimental to your mental health.Be kind to yourself like you are to friends and family around you. Believe in your skill set and your experiences. You have got this.',
      questionList: [
        {
          id: 'q1',
          value: 'List highlight of the past 20 days, no matter how small.',
        },
        {
          id: 'q2',
          value: 'What made you feel good?',
        },
        {
          id: 'q3',
          value: 'What challenges did you face both physical and mental?',
        },
        {
          id: 'q4',
          value:
            'What did you do for yourself that you are proud of?Take a few minutes to practice mindfulness and progressive muscle relaxation.',
        },
        {
          id: 'q5',
          value:
            'Take a few minutes to practice mindfulness and progressive muscle relaxation.',
        },
      ],
    },
  },
  {
    id: 'twentythree',
    active: false,
    value: '23',
    data: {
      day: 'Day 23',
      title: 'dealing with toxic competitiveness',
      content:
        'Healthy competition between people can be good, whether in the educational or professional phase. It becomes problematic when you sabotage someone else for your own gains. It is detrimental to interpersonal relationships and the workplace environment. It can adversely affect your peace of mind and become a hinderance to your education or in performing duties related to your profession. Toxic competitiveness is usually seen amongst peers but is more problematic and difficult to deal with when it comes from someone in a position of power over you, like a senior member of a team at work.',
      questionList: [
        {
          id: 'q1',
          value: 'Have you experienced unhealthy competitiveness from someone?',
        },
        {
          id: 'q2',
          value: 'Why?',
        },
        {
          id: 'q3',
          value: 'Have you ever felt excessively competitive?',
        },
        {
          id: 'q4',
          value: 'Why?',
        },
        {
          id: 'q5',
          value:
            'What are some of the ways you have employed in the past to deal with it?',
        },
      ],
    },
  },
  {
    id: 'twentyfour',
    active: false,
    value: '24',
    data: {
      day: 'Day 24',
      title: 'JEALOUSY AND ENVY',
      content:
        'Envy is wanting what someone else has; the feeling of unhappiness with success of someone else or the need to constantly one-up their accomplishments. It is a sure way to ruin your mental peace. You might see a neighbor with a new car or a co-worker get a new job and desire the same. You might feel a sense of resentment toward the individual for attaining something you want but have yet to achieve.Jealousy is more about holding onto something you already have. You might experience jealousy in a relationship when you perceive a threat or worry that the relationship is changing. While these emotions are easy to define and often easy to recognize, they can be difficult to control.',
      questionList: [
        {
          id: 'q1',
          value: 'Is there anyone you are currently envious of or jealous of?',
        },
        {
          id: 'q2',
          value:
            'Let’s write down all the things that bring out these feelings in you.',
        },
        {
          id: 'q3',
          value: 'How can you replace these emotions with appreciation?',
        },
        {
          id: 'q4',
          value: 'List how you can work towards your goals.',
        },
      ],
    },
  },
  {
    id: 'twentyfive',
    active: false,
    value: '25',
    data: {
      day: 'Day 25',
      title: 'GRATITUDE',
      content:
        "Gratitude is the opposite of envy and is one of many positive emotions which is strongly associated with greater happiness. Gratitude helps people relish good experiences, improve their health, deal with adversity, and build strong relationships. It's about focusing on what's good in our lives and being thankful for the things we often take for granted, like having a place to live, food, clean water, friends, family, and even computer access. Let's write down all the things you are thankful for having in your life, like your fav shirt or a pet.",
      options: [
        {
          id: 'o1',
          value: 'Three things I am grateful for',
          active: false,
        },
        {
          id: 'o2',
          value: 'Something I am proud of',
          active: false,
        },
        {
          id: 'o3',
          value: 'Things that make me happy',
          active: false,
        },
        {
          id: 'o4',
          value: 'Things I am looking forward to ',
          active: false,
        },
      ],
    },
  },
  {
    id: 'twentysix',
    active: false,
    value: '26',
    data: {
      day: 'Day 26',
      title: 'PURGE SOCIAL MEDIA',
      content:
        "The internet is one of our most difficult relationships these days. Headlines and other posts can elicit a wide range of emotions in a short amount of time. Simply looking through social media for five minutes might leave you feeling depleted and exhausted for the rest of the day. It can often feel like you can't express yourself honestly online without receiving backlash from someone. Overall, social media must be balanced carefully. While it's a terrific way to keep connected to individuals and organizations that aren't nearby, it can also become a vicious cycle of negativity. Consider how you feel after going through your social media.",
      options: [
        {
          id: 'o1',
          value:
            'Reflect on your social media habits and determine whether you need to clean up your friend/follow list.',
          active: false,
        },
        {
          id: 'o2',
          value:
            'Unfollow 10 accounts you don’t keep track of anymore or that could be toxic',
          active: false,
        },
        {
          id: 'o3',
          value:
            'Remove all the photos or apps you don’t engage with or find important',
          active: false,
        },
      ],
      questionList: [
        {
          id: 'q1',
          value:
            'Make a list of the platforms you use and fill out the chart with how each makes you feel.',
        },
        {
          id: 'q2',
          value:
            'Write a list of ways to clear your social media accounts and make changes to improve your relationship with your internet circle.',
        },
      ],
    },
  },
  {
    id: 'twentyseven',
    active: false,
    value: '27',
    data: {
      day: 'Day 27',
      title:
        'GIVE AWAY DAY- GIVE AWAY EVERYTHING YOU HAVE NOT USED IN LAST 6 MONTHS',
      content:
        "Minimalist Lifestyle Is Good for Your Physical and Mental Health. A clean and clutter-free environment is super beneficial. Having more earthly desires can cause more stress and anxiety. People use 20% of what they own 80% of the time. The rest takes up space, primarily untouched. Consider the things in your home, the clothes on your body, and even what you take in your luggage on vacation, and contemplate how many of them are adding value to your life. Let's practice a minimalist lifestyle by listing down all the nonessential items you haven't used in the last 6 months and donating them to the needy.Make a List",
    },
  },
  {
    id: 'twentyeight',
    active: false,
    value: '28',
    data: {
      day: 'Day 28',
      title: 'SHORT-term AND LONG-TERM GOALS',
      content:
        'Long terms goals are the goals you set for your future, and short-term goals are an integral part of the planning to achieve them. Long-term goals can’t be met in hours, days, or months. It takes years of dedication, hard work, and planning. Envisioning things you want to achieve in the future can be exciting, but practically executing the plan can be daunting. So, to create an effective strategy to achieve your long-term goals, you set several short-term goals.Short terms goals act as a milestone in your journey to reach the long-term goal of your life. They help you gauge how far you have come and how long you still have to travel to reach your ultimate destination. Also, to achieve long-term goals, you need to break them down into short-term goals. For instance, if you want a luxury car in the future, you need to start saving small chunks of money every month to gather a sufficient amount to buy that car.When you don’t have short-term goals, you lack a clear vision of what you want to achieve. Short-term goals help you see your ultimate goals clearly and set specific guidelines to help you attain your long-term goals.',
    },
  },
  {
    id: 'twentynine',
    active: false,
    value: '29',
    data: {
      day: 'Day 29',
      title: 'MANIFEST:',
      content:
        'Manifesting brings to life everything you desire through your thoughts, actions, beliefs, and emotions. Everything you are aware of is contained within your mind and is the source of your determination. Once your mind determines or accepts something as real, it will bring it into your life. While manifesting is about bringing your dreams to life, it does require you to take proactive steps toward whatever you desire. To provoke inspired action, it is important that your subconscious clearly has your dream in mind. And visualization is the perfect tool for that.',
      options: [
        {
          id: 'o1',
          value:
            'Imagine a clear mental picture of what you desire. Focus on every detail.',
          active: false,
        },
        {
          id: 'o2',
          value:
            'Pay close attention to things like textures, colors, or sounds.',
          active: false,
        },
        {
          id: 'o3',
          value:
            'Describe your dream life as if you already are living it, what does it look like, what does it feel like?',
          active: false,
        },
        {
          id: 'o4',
          value:
            'Things I am looking forward toDraw/Describe your dream on a wall in your room, write it down on a paper and pin it somewhere you can see. ',
          active: false,
        },
      ],
    },
  },
  {
    id: 'thirty',
    active: false,
    value: '30',
    data: {
      day: 'Day 30',
      title: 'REFLECTION OF WHOLE JOURNEY',
      content:
        'Although we have reached the end of our 30-day self-love journey, we sincerely hope that you will continue this journey of self-care and keep on practicing whatever little or more you have learned so far. You can restart your journey whenever you feel like going through it again.',
    },
  },
];

export default days;
