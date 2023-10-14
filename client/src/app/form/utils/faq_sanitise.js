


export const FaqSantizeAndSeperateForAmpAndNonAmp = (FaqBt) => {

// Split the inputText into an array of lines
    const inputText = FaqBt
    const lines = inputText.split('\n');

    // Initialize an empty FAQ array to store questions and answers
    const FAQ = [];

    // Loop through the lines to extract questions and answers
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i].startsWith("/q+")) {
        const question = lines[i].substring(3); // Remove "/q+"
        const answer = lines[i + 1].substring(3); // Remove "/a+"
        FAQ.push({ question, answer });
      }
    }



 
     const faqElementsAMP = FAQ.map((item, index) => {
       return (
 
         index == FAQ.length - 1 ? `{
               "@type": "Question",
               "name": "${item.question}",
               "acceptedAnswer": {
                 "@type": "Answer",
                 "text": "${item.answer}"
               }
             }` : `{
               "@type": "Question",
               "name": "${item.question}",
               "acceptedAnswer": {
                 "@type": "Answer",
                 "text": "${item.answer}"
               }
             },`
       )
     });
 
     const faqRealHtmlNormalAMP = `\t<script type="application/ld+json">
         {
           "@context": "https://schema.org",
           "@type": "FAQPage",
           "mainEntity": [${faqElementsAMP.join('')}]
         }
    </script>
        `;
 
 
     const faqElements = FAQ.map((item, index) => (`<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
               <h3 itemprop="name">${item.question}</h3>
                 <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                   <div itemprop="text">
                     <p>${item.answer}</p>
                   </div>
                 </div>
              </div>
 `
     ));
 
 
     const faqRealHtmlNormal = `\t<div class="card-view-content">
       <h2>${user.selectedLanguage != "" ? user.selectedLanguage : user.checkedOptions[0]['FaqLangH2']}</h2>
       <div itemscope itemtype="https://schema.org/FAQPage">
         ${faqElements.join('')}
         </div>
         </div>
     `;
 
  

}
