/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="mb-10">과제중입니다!</div>
      <div className="flex flex-col items-center w-2/3">
        <p className="mb-10">테스트를 위해 몇가지 요소를 추가해볼게요</p>
        <pre className="mb-10">
          ░░░░░░░░░░░░░░░░░░░░░░░░░░
          <br />
          ░░░░░█▀▀░█▀█░█▀▀░█░█░░░░░░
          <br />
          ░░░░░█▀▀░█▀█░▀▀█░▀█▀░░░░░░
          <br />
          ░░░░░▀▀▀░▀░▀░▀▀▀░░▀░░░░░░░
          <br />
          ░░░░░░░░░░░░░░░░░░░░░░░░░░
        </pre>
        <div>
          <div>
            <div>
              <p className="mb-10">아악 너무 귀여워</p>
              <p className="mb-10">요소안의요소안의요소안의요소 = 요소수</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full  overflow-x-auto">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <img src={`/${index + 1}.jpg`} key={index} alt="버들쓰" width={200} height="auto" />
            ))}
        </div>
      </div>
    </div>
  );
}
