export const signUpFormControls = [
  {
    name: "userName",
    label: " User Name",
    placeholder: "Enter your username",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: " User Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: " User password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: " User Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: " User password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInForm = {
    userEmail:"",
    password: "",

}

export const initialSignUpForm = {
    userName: "",
    userEmail:"",
    password: "",

}

export const courseLandingPageFormControls = [
  {
     name:"title",
     label:"Title",
     componentType:"input",
     type:"text",
     placeholder:"Enter course title"
  },
  {
     name:"category",
     label:"Category",
     componentType:"select",
     type:"text",
     placeholder:"",
    //  options: courseCategories,
  },
  {
     name:"level",
     label:"Level",
     componentType:"select",
     type:"text",
     placeholder:"",
    //  options: courseLevelOptions,

     
  },
  {
     name:"primaryLanguage",
     label:"PrimaryLanguage",
     componentType:"select",
     type:"text",
     placeholder:"",
    //  options: LanguageOptions,
  },
  {
     name:"subtitle",
     label:"Subtitle",
     componentType:"input",
     type:"text",
     placeholder:"Enter course subtitle",
    
  },
  {
     name:"decription",
     label:"Description",
     componentType:"textarea",
     type:"text",
     placeholder:"Enter course subtitle",
  },
  {
     name:"pricing",
     label:"Pricing",
     componentType:"input",
     type:"number",
     placeholder:"Enter course pricing",
  },
  {
     name:"objectives",
     label:"Objectives",
     componentType:"textarea",
     type:"text",
     placeholder:"Enter course objectives",
  },
  {
     name:"welcomeMessage",
     label:"Welcome Message",
     componentType:"textarea",
     placeholder:"Welcome message for students",
  },

]

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  subtitle: "",
  decription: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: '',
}

export const courseCurriculumInitialFormData = [
  {
    title: "",
  videoUrl: "",
  freePreview: false,
  public_id: "",

}
]