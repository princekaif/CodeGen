import React, { useContext, useState } from 'react'; 
import EditorContainer from './EditorContainer';
import InputConsole from './InputConsole';
import OutputConsole from './OutputConsole';
import Navbar from './Navbar';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext';    
import { ModalContext } from '../../context/ModalContext';
import Modal from '../../components/Modal';
import { Buffer } from 'buffer';
import axios from 'axios';

// Add the language extensions mapping
const languageExtensions = {
  'cpp': 'cpp',
  'python': 'py',
  'java': 'java',
  'javascript': 'js'
};

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) => (isFullScreen ? '1fr' : '2fr 1fr')};
  min-height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)')};
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Consoles = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`;

const Playground = () => {
  const { folderId, playgroundId } = useParams();
  const { folders, savePlayground } = useContext(PlaygroundContext);
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext);
  
  // Check if folder and playground data are available
  const playground = folders[folderId]?.playgrounds[playgroundId];

  // Initialize state hooks with default values
  const [currentLanguage, setCurrentLanguage] = useState(playground ? playground.language : '');
  const [currentCode, setCurrentCode] = useState(playground ? playground.code : '');
  const [currentInput, setCurrentInput] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Save current code and language
  const saveCode = () => {
    if (playground) {
      savePlayground(folderId, playgroundId, currentCode, currentLanguage);
    }
  };

  // Add the exportCode function
  const exportCode = () => {
    const extension = languageExtensions[currentLanguage] || 'txt'; // Default to 'txt' if the language isn't mapped
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const encode = (str) => Buffer.from(str, 'binary').toString('base64');
  const decode = (str) => Buffer.from(str, 'base64').toString();

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': 'b4f206a299msh3476fa1f56da62fp107d33jsna525c40696b5', // Replace with your RapidAPI key
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

    const res = await axios.request(options);
    return res.data.token;
  };

  const getOutput = async (token) => {
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'x-rapidapi-key': 'b4f206a299msh3476fa1f56da62fp107d33jsna525c40696b5', // Replace with your RapidAPI key
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
    };

    // Poll the API until the result is ready
    const res = await axios.request(options);
    if (res.data.status_id <= 2) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
      return await getOutput(token);
    }
    return res.data;
  };

  const runCode = async () => {
    if (!playground) return;

    openModal({
      show: true,
      modalType: 6,
      identifiers: {
        folderId: '',
        cardId: '',
      },
    });

    try {
      const language_id = languageMap[currentLanguage].id;
      const source_code = encode(currentCode);
      const stdin = encode(currentInput);

      // Submit the code to the API
      const token = await postSubmission(language_id, source_code, stdin);

      // Get the output
      const res = await getOutput(token);
      const status_name = res.status?.description || 'Unknown status';
      const decoded_output = decode(res.stdout || '');
      const decoded_compile_output = decode(res.compile_output || '');
      const decoded_error = decode(res.stderr || '');

      let final_output = '';
      if (res.status_id !== 3) {
        final_output = decoded_compile_output || decoded_error;
      } else {
        final_output = decoded_output;
      }

      setCurrentOutput(`${status_name}\n\n${final_output}`);
    } catch (error) {
      console.error('Error running code:', error);
      setCurrentOutput('An error occurred while running the code.');
    } finally {
      closeModal();
    }
  };

  const getFile = (e, setState) => {
    const input = e.target;
    if ('files' in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content);
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  if (!playground) {
    return <div>Error: Playground not found.</div>;
  }

  return (
    <div>
      <Navbar isFullScreen={isFullScreen} />
      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={playground.title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <Consoles>
          <InputConsole currentInput={currentInput} setCurrentInput={setCurrentInput} getFile={getFile} />
          <OutputConsole currentOutput={currentOutput} />
        </Consoles>
      </MainContainer>
      {/* Add the export button */}
      <button onClick={exportCode}>Export</button>
      {isOpenModal.show && <Modal />}
    </div>
  );
};

export default Playground;



// import React, { useContext, useState } from 'react'
// import EditorContainer from './EditorContainer'
// import InputConsole from './InputConsole'
// import OutputConsole from './OutputConsole'
// import Navbar from './Navbar'
// import styled from 'styled-components'
// import { useParams } from 'react-router-dom'
// import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext'
// import { ModalContext } from '../../context/ModalContext'
// import Modal from '../../components/Modal'
// import { Buffer } from 'buffer'
// import axios from 'axios'
// const MainContainer = styled.div`
//   display: grid;
//   grid-template-columns: ${({ isFullScreen }) => isFullScreen ? '1fr' : '2fr 1fr'};
//   min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
//   @media (max-width: 768px){
//     grid-template-columns: 1fr;
//   }
// `

// const Consoles = styled.div`
//   display: grid;
//   width: 100%;
//   grid-template-rows: 1fr 1fr;
//   grid-template-columns: 1fr;
// `

// const Playground = () => {
//   const { folderId, playgroundId } = useParams()
//   const { folders, savePlayground } = useContext(PlaygroundContext)
//   const { isOpenModal, openModal, closeModal } = useContext(ModalContext)
//   const { title, language, code } = folders[folderId].playgrounds[playgroundId]

//   const [currentLanguage, setCurrentLanguage] = useState(language)
//   const [currentCode, setCurrentCode] = useState(code)
//   const [currentInput, setCurrentInput] = useState('')
//   const [currentOutput, setCurrentOutput] = useState('')
//   const [isFullScreen, setIsFullScreen] = useState(false)

//   // all logic of the playground
//   const saveCode = () => {
//     savePlayground(folderId, playgroundId, currentCode, currentLanguage)
//   }

//   const encode = (str) => {
//     return Buffer.from(str, "binary").toString("base64")
//   }

//   const decode = (str) => {
//     return Buffer.from(str, 'base64').toString()
//   }

//   const postSubmission = async (language_id, source_code, stdin) => {
//     const options = {
//       method: 'POST',
//       url:  'https://judge0-ce.p.rapidapi.com/submissions/',
//       params: { base64_encoded: 'true', fields: '*' },
//       headers: {
//         'content-type': 'application/json',
//         'Content-Type': 'application/json',
//         'x-rapidapi-key': 'b4f206a299msh3476fa1f56da62fp107d33jsna525c40696b5',
//         'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
//         'Content-Type': 'application/json'
//       },
//       data: JSON.stringify({
//         language_id: language_id,
//         source_code: source_code,
//         stdin: stdin
//       })
//     };

//     const res = await axios.request(options);
//     return res.data.token
//   }

//   const getOutput = async (token) => {
//     // we will make api call here
//     const options = {
//       method: 'GET',
//       url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
//       params: { base64_encoded: 'true', fields: '*' },
//       headers: {
//        	'x-rapidapi-key': 'b4f206a299msh3476fa1f56da62fp107d33jsna525c40696b5',
// 		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
//       }
//     };

//     // call the api
//     const res = await axios.request(options);
//     if (res.data.status_id <= 2) {
//       const res2 = await getOutput(token);
//       return res2.data;
//     }
//     return res.data;
//   }

//   const runCode = async () => {
//     openModal({
//       show: true,
//       modalType: 6,
//       identifiers: {
//         folderId: "",
//         cardId: "",
//       }
//     })
//     const language_id = languageMap[currentLanguage].id;
//     const source_code = encode(currentCode);
//     const stdin = encode(currentInput);

//     // pass these things to Create Submissions
//     const token = await postSubmission(language_id, source_code, stdin);

//     // get the output
//     const res = await getOutput(token);
//     const status_name = res.status.description;
//     const decoded_output = decode(res.stdout ? res.stdout : '');
//     const decoded_compile_output = decode(res.compile_output ? res.compile_output : '');
//     const decoded_error = decode(res.stderr ? res.stderr : '');

//     let final_output = '';
//     if (res.status_id !== 3) {
//       // our code have some error
//       if (decoded_compile_output === "") {
//         final_output = decoded_error;
//       }
//       else {
//         final_output = decoded_compile_output;
//       }
//     }
//     else {
//       final_output = decoded_output;
//     }
//     setCurrentOutput(status_name + "\n\n" + final_output);
//     closeModal();
//   }

//   const getFile = (e, setState) => {
//     const input = e.target;
//     if ("files" in input && input.files.length > 0) {
//       placeFileContent(input.files[0], setState);
//     }
//   };

//   const placeFileContent = (file, setState) => {
//     readFileContent(file)
//       .then((content) => {
//         setState(content)
//       })
//       .catch((error) => console.log(error));
//   };

//   function readFileContent(file) {
//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//       reader.onload = (event) => resolve(event.target.result);
//       reader.onerror = (error) => reject(error);
//       reader.readAsText(file);
//     });
//   }

//   return (
//     <div>
//       <Navbar isFullScreen={isFullScreen} />
//       <MainContainer isFullScreen={isFullScreen}>
//         <EditorContainer
//           title={title}
//           currentLanguage={currentLanguage}
//           setCurrentLanguage={setCurrentLanguage}
//           currentCode={currentCode}
//           setCurrentCode={setCurrentCode}
//           folderId={folderId}
//           playgroundId={playgroundId}
//           saveCode={saveCode}
//           runCode={runCode}
//           getFile={getFile}
//           isFullScreen={isFullScreen}
//           setIsFullScreen={setIsFullScreen}
//         />
//         <Consoles>
//           <InputConsole
//             currentInput={currentInput}
//             setCurrentInput={setCurrentInput}
//             getFile={getFile}
//           />
//           <OutputConsole
//             currentOutput={currentOutput}
//           />
//         </Consoles>
//       </MainContainer>
//       {isOpenModal.show && <Modal />}
//     </div>
//   )
// }

// export default Playground