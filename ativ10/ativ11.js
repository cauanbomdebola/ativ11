const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startQuizz);

function startQuizz() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  nextQuestion();
}

function nextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(answer) {
  const correct = answer.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.innerText === answer.text && correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setTimeout(nextQuestion, 1000);
  } else {
    startButton.innerText = 'Reiniciar';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Qual das seguintes disciplinas é tipicamente obrigatória no ensino médio?',
    answers: [
      { text: 'Economia doméstica', correct: false },
      { text: 'Programação de computadores', correct: false },
      { text: 'Psicologia avançada', correct: false },
      { text: 'Matemática', correct: true }
    ]
  },
  {
    question: 'Qual é o propósito principal do Exame Nacional do Ensino Médio (ENEM)?',
    answers: [
      { text: 'Selecionar candidatos para cargos públicos', correct: false },
      { text: 'Avaliar a qualidade das escolas locais', correct: false },
      { text: 'Fornecer informações de trânsito aos estudantes', correct: false },
      { text: 'Avaliar a aptidão dos estudantes para o ensino superior', correct: true }
    ]
  },
  {
    question: 'Quais são os anos de duração do ensino médio no sistema educacional tradicional?',
    answers: [
      { text: '1 ano', correct: false },
      { text: '2 anos', correct: false },
      { text: '3 anos', correct: true },
      { text: '4 anos', correct: false }
    ]
  },
  {
    question: 'O que é o "vestibular"?',
    answers: [
      { text: 'Um acessório de moda popular entre os estudantes', correct: false },
      { text: 'Uma festa de formatura do ensino médio', correct: false },
      { text: 'Um exame para ingresso no ensino superior', correct: true },
      { text: 'Uma competição esportiva entre escolas', correct: false }
    ]
  },
  {
    question: 'Qual é a finalidade do Projeto de Pesquisa no ensino médio?',
    answers: [
      { text: 'Criar uma nova dieta saudável para estudantes', correct: false },
      { text: 'Desenvolver uma nova rede social', correct: false },
      { text: 'Realizar uma investigação científica sobre um tópico específico', correct: true },
      { text: 'Escrever um romance de ficção científica', correct: false }
    ]
  }
];
