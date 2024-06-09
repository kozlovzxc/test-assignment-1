import { useEffect, useMemo, useState } from "react";
import { countriesData } from "./countries";

type ArrayElement<SubType extends readonly unknown[]> =
  SubType extends readonly (infer ElementType)[] ? ElementType : never;

type ContryData = ArrayElement<typeof countriesData>;

const shuffle = <T extends unknown>(array: T[]): T[] =>
  array
    .map((value) => ({ value, _sort: Math.random() }))
    .sort((a, b) => a._sort - b._sort)
    .map(({ value }) => value);

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  givenAnswer: string | undefined;
};

type QuestionViewProps = {
  question?: Question;
  onAnswer?: (question: Question, option: string) => unknown;
};

const QuestionView = ({ question, onAnswer }: QuestionViewProps) => {
  if (question == null) {
    return <></>;
  }

  const handleAnswer = (option: string) => () => {
    onAnswer(question, option);
  };

  return (
    <>
      <h1>{question.question}</h1>
      <div>Given answer: {question.givenAnswer}</div>
      <div className="flex flex-wrap gap-2">
        {question.options.map((option) => (
          <button
            key={option}
            className="p-2 basis-1/3 grow bg-red-500"
            onClick={handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

const QUIZ_LENGTH = 10;

export function App() {
  let [questions, setQuestions] = useState<Question[]>([]);
  let [questionId, setQuestionId] = useState<number>(0);

  useEffect(() => {
    // Kinda fetch it
    let questions: Question[] = shuffle(countriesData)
      // group by 4
      .reduce<ContryData[][]>((acc, cur, index) => {
        if (index % 4 === 0) {
          return [...acc, [cur]];
        }
        return [...acc.slice(0, acc.length - 1), [...acc[acc.length - 1], cur]];
      }, [])
      // getting first 10 questions
      .slice(0, QUIZ_LENGTH)
      .map((item) => ({
        question: `Which country is ${item[0].countryCapital} the capital?`,
        options: shuffle([
          item[0].countryName,
          item[1].countryName,
          item[2].countryName,
          item[3].countryName,
        ]),
        correctAnswer: item[0].countryName,
        givenAnswer: undefined,
      }));

    setQuestions(questions);
  }, []);

  let handleTabClick = (questionId: number) => () => {
    setQuestionId(questionId);
  };

  let handleAnswer = (question: Question, option: string) => {
    const newQuestions = questions.map((item) =>
      item === question ? { ...item, givenAnswer: option } : item,
    );
    setQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-[600px] w-[600px] bg-green-500 flex flex-col items-center p-5 gap-5">
        <h3>Country Quiz</h3>
        <div className="flex gap-2">
          {Array(QUIZ_LENGTH)
            .fill(undefined)
            .map((_, index) => (
              <button
                key={index}
                className="px-3 py-1 rounded-full bg-blue-500"
                onClick={handleTabClick(index)}
              >
                {index + 1}
              </button>
            ))}
        </div>
        <QuestionView
          question={questions[questionId]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
