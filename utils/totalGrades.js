const grades = require("./grades")

/**
 * Maps over the grades result from the "grades" function
 * Returns an Object of key value pairs with grade and count
 */


const totalGrades = async (rollNumber, password, semesterId) => {
    const gradesFinalObj = await grades(rollNumber, password, semesterId)
    const gradesCount = {}
    // Map over Grades Final Obj
    for (let i in gradesFinalObj){
    Object.keys(gradesFinalObj[i]).map(ele =>{
        
        const subjects = Object.keys(gradesFinalObj[i][ele]["subjects"])

            // Omit if there is no subject
            if(subjects.length !== 0) {
                subjects.map(subject => { 

                    let grade = gradesFinalObj[i][ele]["subjects"][subject].grade

                    if(!Object.keys(gradesCount).includes(grade)){
                        gradesCount[grade] = 1
                    } else {
                        gradesCount[grade] +=1
                    }
                    
                })
            }

        })
    }
    return gradesCount
}

module.exports = totalGrades