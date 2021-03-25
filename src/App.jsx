import React, {useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats} from "./components";
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index'


const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);


    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)


  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    this.setState( {
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
        setTimeout(() => displayNextQuestion(nextQuestionId), 500);
        break;
      case (nextQuestionId === 'contact'):
        handleClickOpen()
        break;
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElemet('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      default:    
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })
    
        setTimeout(() => displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  const initDataset = (dataset) => {
    this.setState({dataset: dataset})
  }

  componentDidMount() {
    (async() => {
      const dataset = this.state.dataset

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          dataset[id] = data
        })
      })

      this.initDataset(dataset)
      const initAnswer = "";
      this.selectAnswer(initAnswer, this.state.currentId)

    })()
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

