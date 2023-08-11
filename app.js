const express = require("express");


const dotenv = require('dotenv');

const app = express()

dotenv.config();

const port = process.env.PORT || 3000

app.use(express.json())

const prompt1 = `you are a educator in a institute in which your task is to tag question in given steps below which are delimited by ### and 

### step1 :- You are to add subject tags and drilled down hierarchical topics tags to questions. These subjects are from Indian Government competitive. 
level 1 tag must be Subject tag 

for example :- 
question1 : "The density of water is 1 g/cc. This is strictly valid at
(1) 0°C 
(2) 4°C
(3) 25°C 
(4) 100°C".
tags : {"subjectTags": {"Level1": "Physics", "Level2": "Mechanics", "Level3": "Fluid Mechanics"}}.

question2 : """How many zeros are there at the end in product 213 × 510?

(1) 13 (2) 10
(3) 23 (4) 33"""

tags : {"subjectTags": {"Level1": "Numerical Aptitude", "Level2": "Number Systems", "Level3": "Number of Zeroes"}, "skillTags": ["Implementing", "Knowledge of subject specific techniques and methods"]}

level 2  tag must be topic tag of the question, to find topic you first must solve and recognize which topic you used 

for example : -

question1 : "The density of water is 1 g/cc. This is strictly valid at
(1) 0°C 
(2) 4°C
(3) 25°C 
(4) 100°C".

tags : {"subjectTags": {"Level1": "Physics", "Level2": "Mechanics", "Level3": "Fluid Mechanics"}}.

question2 : """How many zeros are there at the end in product 213 × 510?

(1) 13 (2) 10
(3) 23 (4) 33"""

tags : {"subjectTags": {"Level1": "Numerical Aptitude", "Level2": "Number Systems", "Level3": "Number of Zeroes"}, "skillTags": ["Implementing", "Knowledge of subject specific techniques and methods"]}

level 3 tag must be sub topic of topic used to solve the question 

for example :- 

question1 : "The density of water is 1 g/cc. This is strictly valid at
(1) 0°C 
(2) 4°C
(3) 25°C 
(4) 100°C".
tags : {"subjectTags": {"Level1": "Physics", "Level2": "Mechanics", "Level3": "Fluid Mechanics"}}.

question2 : """How many zeros are there at the end in product 213 × 510?

(1) 13 (2) 10
(3) 23 (4) 33"""

tags : {"subjectTags": {"Level1": "Numerical Aptitude", "Level2": "Number Systems", "Level3": "Number of Zeroes"}, "skillTags": ["Implementing", "Knowledge of subject specific techniques and methods"]}

Only select the subject tags which are mention in "Subjects" inside triple quote and first understand each tag by its meaning . Answer should be in JSON format like { "subjectTags":{"Level1": "Subject tag 1", "Level2": "Topic Tag 1", "Level3": "Sub-Topic Tag 1"} } .

Choose from one of the following subjects.
Subjects: “”” History, Indian History, World History, Numerical Aptitude, Physics, Polity, Reasoning, Static General Knowledge, Geography, Indian Art and Culture, Statistics, Biology, Business Management, Economy, General Awareness, Chemistry, English, Environment, Verbal Ability, English Grammar, Vocabulary, Verbal Reasoning, Non-Verbal Reasoning, Analytical Reasoning, Indian Art and Culture, Disaster Management, Financial Awareness, Insurance Awareness, Legal Awareness, Banking Awareness, Marketing Awareness, Computer Awareness, Numerical Aptitude, and Data Interpretation.
General Physics, Mechanics, Number Systems, Number of Zeroes, Fluid Mechanics, Verbal Reasoning, Coding and Decoding, Thermal Physics, Electricity, Electronic Devices, Magnetism, Optics, Properties of Solids and Liquids, Kinetic theory of gases, Communications Systems, Scope of Economics, Nature of Economics, Sectors of Economy, Economic Systems, Distribution Systems, Capitalism, National Income, Cost and Price of National Income, Growth, Development and Happiness, Indian Economy, Economic Reforms, Inflation, Business Cycle, Agriculture and Food Management, Industry, and Infrastructure, Service Sector, Indian Financial Market, Banking in India, Insurance in India, Security market in India, External Sector In India, International Economic Organisations and India, Tax Structure in India, Public Finance in India, Sustainability and Climate Change- India and the World, Human Development in India, Socio-Economic Issues in India, Law of Demand and Supply, Theory of Production and Cost, Markets and Price Determination, Comptroller and Auditor General of India
”””.


step 2 :- You are to add a Skill tag according to Bloom's taxonomy. You are using 2 dimensions of Bloom's taxonomy, first is the Cognitive dimension and second is the knowledge-based dimension in which the following tags are given and you have to choose skill tags from the delimited by triple quotes below. you should solve the question and then decide which of the skill tag suits 

Skill tags: “””Recognizing, Recalling, Implementing, Inferring, Interpreting, Classifying, Inferring, Implementing, Comparing, Organizing, Differentiating, Analyzing, Attributing, Checking, Knowledge of terminology, Knowledge of specific details and elements, Knowledge of classifications and categories, Knowledge of subject specific skills and algorithms, Knowledge of subject specific techniques and methods, Knowledge of principles and generalizations”””

Answer should be single line JSON for e.g. {"skillTags": ["tag1", "tag2","tag3", …]}. skill tags may be 1 or more than one. 
Skill tag should be attached on the basis of direction given below :

Recognizing: In questions which are in the format of present or future questions and also suggested with all general awareness. For example “At what temperature, both Celsius and Fahrenheit scales will show the identical readings?”, “What is the SI Unit of Acceleration?”.

Recalling: In questions which are in the format of past questions. For example “The eighth-century tripartite power struggle was among which of the following?”

Interpreting: Solve/answer the question by understanding the meaning on what question is focusing or highlighting or when words these words found in the question “””classify, covert, conclude, demonstrate, describe, discuss, explain, identify, illustrate, locate, paraphrase, predict, recognize, report, select, summarize, translate, most appropriate, meaning, substitute, synonyms, antonyms, idioms, phrases”””. interpreting tag means the act of explaining, reframing, or otherwise showing your own understanding of something. example - In a certain code language, 'mee muk pic' is 'roses are yellow', 'nil dic' is 'white flowers', and 'pic muk dic' is 'flowers are fruits'. What is the code for 'white' in that code language?
Now, analyze the whole explanation and example and Suggest an Interpreting tag to questions.

Exemplifying: Questions that ask to give examples of anything

Classifying: Questions which ask to classify or categorize the given things/topics.

Summarizing: If the question is asking to summarize anything or wants any information in a brief manner. 

Inferring: When you have to draw a logical conclusion from the given information or context or when no direction is given to how to solve the given question or problem.

Comparing: when question is asked to compare or same way as another number,letter or group 

Implementing: If a learned knowledge is implemented to answer any unfamiliar situation/problem to solve the question. Implementing tags must always be suggested with Knowledge of subject-specific techniques and methods. Whenever a question require to use of some formula you must suggest Implementing it with the Knowledge of subject-specific techniques and methods


Organizing: When the question asks to organize the information about any topic or the given material/information in a way that it fits or functions within a structure or when a question is asked to arrange or rearrange the given data.

Checking: when question is asked to find the incorrect or wrongly spelt or not is given in the main heading or direction.

Knowledge of terminology: this knowledge tag is suggested when a specific term is given or question is asking a specific term related to their field} {Knowledge of specific details and elements, this knowledge tag is suggested when the question is asking for some details or with every general awareness question 

Knowledge of classifications and categories: when question is asked to classify the data on the basis of their category.

Knowledge of principles and generalizations: when any principle or formula is asked in question 

Knowledge of subject specific skills and algorithms: This tag used when according to question there is a requirement to use the specific skills like if the question asked to select the correct alternative to indicate the arrangement of the following words in a logical and meaningful order. Here, in this question, one should have the skills of arranging in order. If according to question one should have to do comparison or analysis then it will be recognized as skill. Analyse yourself the above explanation and suggest the tag at required place.

Knowledge of subject specific techniques and methods: this skill tag should be attached with implementing skill tag or when their is a formula required to applied in queston. 

put tags to question given below 

question : Six years ago Parvez’s age was same as the present age of Manish. If the present age of Parvez is one-fourth more than that of Manish’s present age, then in how many years will Parvez’s age become double of Manish’s present age?




`;

const prompt2 = `you are an educator at an institute. Your task is to tag questions using the provided steps below, which are delimited by ###:

### step1: Tagging Questions
You are to add subject tags and hierarchical topic tags to questions. These subjects are from Indian Government competitive exams. The tagging should follow this format:
- Level 1 tag: Subject tag
- Level 2 tag: Topic tag derived from the solved question
- Level 3 tag: Sub-topic tag derived from the topic used to solve the question

For example:
Question: "The density of water is 1 g/cc. This is strictly valid at..."
Tags: {"subjectTags": {"Level1": "Physics", "Level2": "Mechanics", "Level3": "Fluid Mechanics"}}

### step2: Skill Tagging
You are to add skill tags based on Bloom's taxonomy. Choose skill tags based on the Bloom's cognitive dimension and knowledge-based dimension. Use the provided skill tags list and attach relevant skill tags based on your solving approach:

Skill tags: "Recognizing, Recalling, Implementing, Inferring, Interpreting, Classifying, Comparing, Organizing, Differentiating, Analyzing, Attributing, Checking, Knowledge of terminology, Knowledge of specific details and elements, Knowledge of classifications and categories, Knowledge of subject specific skills and algorithms, Knowledge of subject specific techniques and methods, Knowledge of principles and generalizations"

Answer should be in JSON format for both subject and skill tags.

Choose from one of the following subjects.
Subjects: "History, Indian History, World History, Numerical Aptitude, Physics, Polity, Reasoning, Static General Knowledge, Geography, Indian Art and Culture, Statistics, Biology, Business Management, Economy, General Awareness, Chemistry, English, Environment, Verbal Ability, English Grammar, Vocabulary, Verbal Reasoning, Non-Verbal Reasoning, Analytical Reasoning, Indian Art and Culture, Disaster Management, Financial Awareness, Insurance Awareness, Legal Awareness, Banking Awareness, Marketing Awareness, Computer Awareness, Numerical Aptitude, and Data Interpretation. General Physics, Mechanics, Number Systems, Number of Zeroes, Fluid Mechanics, Verbal Reasoning, Coding and Decoding, Thermal Physics, Electricity, Electronic Devices, Magnetism, Optics, Properties of Solids and Liquids, Kinetic theory of gases, Communications Systems, Scope of Economics, Nature of Economics, Sectors of Economy, Economic Systems, Distribution Systems, Capitalism, National Income, Cost and Price of National Income, Growth, Development and Happiness, Indian Economy, Economic Reforms, Inflation, Business Cycle, Agriculture and Food Management, Industry, and Infrastructure, Service Sector, Indian Financial Market, Banking in India, Insurance in India, Security market in India, External Sector In India, International Economic Organisations and India, Tax Structure in India, Public Finance in India, Sustainability and Climate Change- India and the World, Human Development in India, Socio-Economic Issues in India, Law of Demand and Supply, Theory of Production and Cost, Markets and Price Determination, Comptroller and Auditor General of India"

After solving the question, provide the tags in JSON format like this:
{
  "subjectTags": {
    "Level1": "Chosen Subject",
    "Level2": "Chosen Topic",
    "Level3": "Chosen Sub-Topic"
  },
  "skillTags": ["Chosen Skill Tag 1", "Chosen Skill Tag 2", ...]
}

tag question below 
Question: Six years ago Parvez’s age was same as the present age of Manish. If the present age of Parvez is one-fourth more than that of Manish’s present age, then in how many years will Parvez’s age become double of Manish’s present age?
`;

const prompt3 = `you are an educator at an institute. Your task is to tag questions using the provided steps below, which are delimited by ###:

### step1: Tagging Questions
You are to add subject tags and hierarchical topic tags to questions. These subjects are from Indian Government competitive exams. The tagging should follow this format:
- Level 1 tag: Subject tag
- Level 2 tag: Topic tag derived from the solved question
- Level 3 tag: Sub-topic tag derived from the topic used to solve the question

For example:
Question: "The density of water is 1 g/cc. This is strictly valid at..."
Tags: {"subjectTags": {"Level1": "Physics", "Level2": "Mechanics", "Level3": "Fluid Mechanics"}}

### step2: Skill Tagging
You are to add skill tags based on Bloom's taxonomy. Choose skill tags based on the Bloom's cognitive dimension and knowledge-based dimension. Use the provided skill tags list and attach relevant skill tags based on your solving approach:

Skill tags: "Recognizing, Recalling, Implementing, Inferring, Interpreting, Classifying, Comparing, Organizing, Differentiating, Analyzing, Attributing, Checking, Knowledge of terminology, Knowledge of specific details and elements, Knowledge of classifications and categories, Knowledge of subject specific skills and algorithms, Knowledge of subject specific techniques and methods, Knowledge of principles and generalizations"

Answer should be in JSON format for both subject and skill tags.

Choose from one of the following subjects.
Subjects: "History, Indian History, World History, Numerical Aptitude, Physics, Polity, Reasoning, Static General Knowledge, Geography, Indian Art and Culture, Statistics, Biology, Business Management, Economy, General Awareness, Chemistry, English, Environment, Verbal Ability, English Grammar, Vocabulary, Verbal Reasoning, Non-Verbal Reasoning, Analytical Reasoning, Indian Art and Culture, Disaster Management, Financial Awareness, Insurance Awareness, Legal Awareness, Banking Awareness, Marketing Awareness, Computer Awareness, Numerical Aptitude, and Data Interpretation. General Physics, Mechanics, Number Systems, Number of Zeroes, Fluid Mechanics, Verbal Reasoning, Coding and Decoding, Thermal Physics, Electricity, Electronic Devices, Magnetism, Optics, Properties of Solids and Liquids, Kinetic theory of gases, Communications Systems, Scope of Economics, Nature of Economics, Sectors of Economy, Economic Systems, Distribution Systems, Capitalism, National Income, Cost and Price of National Income, Growth, Development and Happiness, Indian Economy, Economic Reforms, Inflation, Business Cycle, Agriculture and Food Management, Industry, and Infrastructure, Service Sector, Indian Financial Market, Banking in India, Insurance in India, Security market in India, External Sector In India, International Economic Organisations and India, Tax Structure in India, Public Finance in India, Sustainability and Climate Change- India and the World, Human Development in India, Socio-Economic Issues in India, Law of Demand and Supply, Theory of Production and Cost, Markets and Price Determination, Comptroller and Auditor General of India"

After solving the question, provide the tags in JSON format like this:
{
  "subjectTags": {
    "Level1": "Chosen Subject",
    "Level2": "Chosen Topic",
    "Level3": "Chosen Sub-Topic"
  },
  "skillTags": ["Chosen Skill Tag 1", "Chosen Skill Tag 2", ...]
}

tag question below 
Question: ${req.body.question}
`;

app.get("/testtag", async (req, res, next) => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);


    try {
        console.log(prompt)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt2,
            top_p: 1,
            max_tokens: 256,
        });
        console.log(response.data.choices[0].text)
        res.status(200).json(response.data.choices[0].text)
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
})



app.listen(port, () => {
    console.log("server is listening on 3000")
})