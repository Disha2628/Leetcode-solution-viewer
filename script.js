  const searchInputField = document.querySelector(".problem-input");
  const searchButton = document.querySelector(".search-btn");
  const answerbox = document.querySelector(".answerbox");
  const URL = 'https://raw.githubusercontent.com/haoel/leetcode/master/README.md';
  let languageSelect = "";
  let searchInput = "" ;
  let solutionLink = "";
  
  searchButton.addEventListener("click" , () => {
      searchInput = searchInputField.value.trim();
      languageSelect = document.querySelector(".language-selector").value;
      catchSolution(languageSelect);
  })
  
  let problemList1=[], problemList2=[], problemList3=[], problemList4=[], problemList5=[], problemList6=[];
  
  function getData(URL) {
      return fetch(URL)
          .then(response => response.text())
          .then(text => {
              parseProblemData(text);
          })
          .catch(error => {
              console.error('Error fetching README:', error); 
          });
  }   
  
  
  function catchSolution(languageSelect) {
      getData(URL).then(() => {
          const problem = problemList.find(p => p.number === searchInput || p.name.toLowerCase() === searchInput.toLowerCase());
          if (problem) {
               if(languageSelect == "cpp"){solutionLink = problem.CppLink;}
               else if(languageSelect == "python"){solutionLink = problem.PyLink;}
               else if(languageSelect == "java"){solutionLink = problem.JavaLink;}
               else{solutionLink = problem.GoLink;}
               if (solutionLink) {
                  fetchSolution(solutionLink);
              } else {
                  console.error(`Solution for language ${languageSelect} not found!`);
              }
          } else {
              answerbox.innerText = `Out of Data , Please choose another problem or language.`;
          }
      });
    }

  
  
  function fetchSolution(solutionLink) {
      fetch(`https://raw.githubusercontent.com/haoel/leetcode/master${solutionLink.slice(1)}`)
          .then(response => {
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              return response.text();
          })
          .then(code => {
              answerbox.innerText = code; // Display the solution code
          })
          .catch(error => {
              answerbox.innerText = `Out of Data , Please choose another problem or language.`;
          });
  }

  function parseProblemData(data) { 
      problemList1 = [];
      problemList2 = [];
      problemList3 = [];
      problemList4 = [];
      problemList5 = [];
      problemList6 = [];
      
      // C++ problem parsing
      parse_cpp(data);
      // Python problem parsing
      parse_py(data);
      // C++ + Python problem parsing
      parse_cpp_py(data);
      // C++ + Java + Python problem parsing
      parse_cpp_py_java(data);
      // C++ + Java problem parsing
      parse_cpp_java(data);
      // C++ + Go problem parsing
      parse_cpp_go(data);
      
      // Combine relevant problem lists based on selected language
      if(languageSelect === "cpp") {
          problemList = problemList1.concat(problemList5, problemList3, problemList4, problemList6);
      } else if (languageSelect === "python") {
          problemList = problemList2.concat(problemList4, problemList3);
      } else if (languageSelect === "java") {
          problemList = problemList4.concat(problemList5);
      } else {
          problemList = problemList6;
      }
  }
  
  function parse_cpp(data) {
      const regex1 = /\|(\d+)\|.*\[(.*?)\]\(https:\/\/leetcode\.com\/problems\/[^\)]+\)\s*\|\s*\[C\+\+\]\(([^)]+)\)\|/g;
      let match;
      while ((match = regex1.exec(data)) !== null) {
          problemList1.push({ number: match[1].trim(), name: match[2].trim(), CppLink: match[3].trim() });
      }
  }
  
  function parse_py(data) {
      const regex2 = /\|(\d+)\|.*\[(.*?)\]\(https:\/\/leetcode\.com\/problems\/.*\)\s*\|\s*\[Python\]\((.*?)\)\|/g;
      let match;
      while ((match = regex2.exec(data)) !== null) {
          problemList2.push({ number: match[1].trim(), name: match[2].trim(), PyLink: match[3].trim() });
      }
  }
  
  function parse_cpp_py(data) {
      const regex3 = /\|(\d+)\|.*\[(.*?)\]\(https:\/\/leetcode\.com\/problems\/[^\)]+\)\s*\|\s*\[C\+\+\]\(([^)]+)\)\s*,\s*\[Python\]\(([^)]+)\)\|/g;
      let match;
      while ((match = regex3.exec(data)) !== null) {
          problemList3.push({ number: match[1].trim(), name: match[2].trim(), CppLink: match[3].trim(), PyLink: match[4].trim()});
      }
  }
  
  function parse_cpp_py_java(data) {
      const regex4 = /\|(\d+)\|.*\[(.*?)\]\(https:\/\/leetcode\.com\/problems\/[^\)]+\)\s*\|\s*\[C\+\+\]\(([^)]+)\)\s*,\s*\[Java\]\(([^)]+)\)\s*,\s*\[Python\]\(([^)]+)\)\|/g;
      let match;
      while ((match = regex4.exec(data)) !== null) {
          problemList4.push({ number: match[1].trim(), name: match[2].trim(), CppLink: match[3].trim(), JavaLink: match[4].trim(), PyLink: match[5].trim() });
      }
  }
  
  function parse_cpp_java(data) {
      const regex5 = /\|(\d+)\|.*\[(.*?)\]\(https:\/\/leetcode\.com\/problems\/[^\)]+\)\s*\|\s*\[C\+\+\]\(([^)]+)\)\s*,\s*\[Java\]\(([^)]+)\)\|/g; 
      let match;
      while ((match = regex5.exec(data)) !== null) {
          problemList5.push({ number: match[1].trim(), name: match[2].trim(), CppLink: match[3].trim(), JavaLink: match[4] });
      }
  }
  
  function parse_cpp_go(data) {
      const regex6 = /\|(\d+)\|.*\[(.*?)\]\(https:\/\/leetcode\.com\/problems\/[^\)]+\)\s*\|\s*\[C\+\+\]\(([^)]+)\)\s*,\s*\[Go\]\(([^)]+)\)\|/g;
      let match;
      while ((match = regex6.exec(data)) !== null) {
          problemList6.push({ number: match[1].trim(), name: match[2].trim(), CppLink: match[3].trim(), GoLink: match[4].trim() });
      }
  }
  