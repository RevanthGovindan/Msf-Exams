// ==========================================================================
// Constants
// generic constants used all over the app.
export const Logins = {
    ADMIN_PANEL:'admin',
    CANDIDATE_LOGIN :'candidate'
}

export const adminmenu = {
    EXAMINATION:'exam',
    QUESTIONS:'question',
    EVALUATION:'evaluation'
}

 export const questTypes = {
   MCQ:"mcq",
   TEXT:"text"
  };

  export const questionHeaders=[
    "question",
    "question_type",
    "option1",
    "option2",
    "option3",
    "option4",
    "answer_option",
  ]
  sessionStorage.setItem('myData', '');
// ==========================================================================