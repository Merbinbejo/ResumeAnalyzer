import React from "react";
import Typewriter from "typewriter-effect"

export const Home = () => {
  return (
    <div className="home">
      <div className="text">
        <span>A</span>
        <span>I</span>&nbsp;
        <span>R</span>
        <span>e</span>
        <span>s</span>
        <span>u</span>
        <span>m</span>
        <span>e</span>&nbsp;
        <span>A</span>
        <span>n</span>
        <span>a</span>
        <span>l</span>
        <span>y</span>
        <span>z</span>
        <span>e</span>
        <span>r</span>
      </div>
      <p className="para">
        AI Resume Analyzer is an intelligent web-based application designed to
        analyze and evaluate resumes by comparing them with job descriptions
        using Artificial Intelligence (AI) and Natural Language Processing
        (NLP). The main objective of this system is to help job seekers improve
        their resumes and increase their chances of getting selected for
        interviews by providing data-driven feedback and suggestions. The system
        works by allowing users to upload their resume in PDF or text format and
        paste a job description for the role they are applying for. The
        application then processes both the resume and the job description using
        Natural Language Processing techniques such as tokenization, stop-word
        removal, keyword extraction, and text similarity analysis. After
        analyzing the content, the system identifies matching skills, missing
        skills, and important keywords that are present in the job description
        but missing in the resume.
      </p>
      <Typewriter
        options={{
          strings: [
            "AI Resume Analyzer",
            "Analyze Your Resume",
            "Improve Your Skills",
          ],
          autoStart: true,
          loop: true,
          delay: 50,
        }}
      />
    </div>
  );
};
