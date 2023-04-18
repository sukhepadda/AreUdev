export default function handler(req, res) {
    if (req.method === 'POST') {

        let courseObjects = returnStandardValues();


        let everyweektutor = req.body.tutorValue;
        let everyweekpractice = req.body.practiceValue;
      
        let totaleachweek = everyweekpractice + everyweektutor;

        let totalweeks = courseObjects.totalhours / totaleachweek;

        let totalmonths = totalweeks / 4;

        //round to whole number
        totalmonths = Math.round(totalmonths);

        let simplesummarysentence = "It will take " + totalmonths + " months to complete the course" + " with " + everyweekpractice + " hours of practice and " + everyweektutor + " hours of tutoring each week";



        let learningestimationObject = {
            totalmonths: totalmonths,
            totalweeks: totalweeks,
            totaleachweek: totaleachweek,
            everyweekpractice: everyweekpractice,
            everyweektutor: everyweektutor,
            courseObjects: courseObjects,
            simplesummarysentence: simplesummarysentence

        }
        res.json(learningestimationObject);
    } else {
        // Handle any other HTTP method
        res.send("this is return estimate")
    }
}

function returnStandardValues() {

    let numberofweeks = 4;
    let standardcoursemonths = 5;
    let standardcourseweeks = standardcoursemonths * numberofweeks;
    let standardperweekhours = 4;
    let standardcourseduration = standardcourseweeks * standardperweekhours;

    let practiceMultiplier = 3;
    let standardcoursedurationwithpractice = standardcourseduration * practiceMultiplier;

    let preparationhours = 10;
    let javascripthours = 40;
    let cloudandothers = 10;

    let totalhours = standardcoursedurationwithpractice + preparationhours + javascripthours + cloudandothers + standardcourseduration;

    let courseObjects = {
        standardcourseduration: standardcourseduration,
        standardcoursedurationwithpractice: standardcoursedurationwithpractice,
        preparationhours: preparationhours,
        javascripthours: javascripthours,
        cloudandothers: cloudandothers,
        totalhours: totalhours

    }
    return courseObjects;
}