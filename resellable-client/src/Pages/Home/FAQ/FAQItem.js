import React from "react";

const FAQItem = ({faqs}) => {
  const {question, answer} = faqs;  
  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
    >
      <div className="collapse-title text-xl font-medium">
        {question}
      </div>
      <div className="collapse-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
