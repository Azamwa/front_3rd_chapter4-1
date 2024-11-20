/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="mb-10">과제중입니다!</div>
      <div className="flex gap-5">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <img src={`/${index + 1}.jpg`} key={index} alt="버들쓰" width={200} height="auto" />
          ))}
      </div>
    </div>
  );
}
