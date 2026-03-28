

function HeroName() {
  return (
    <div className="flex items-center justify-start flex-1 md:pl-8 pl-2 ">
      <div className="flex items-center gap-4 relative ">
        <div className="flex flex-col gap-2">
          <span className="md:text-lg text-sm text-muted-foreground flex items-center gap-2 ">
        Developer <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M7.5 9.125a1.625 1.625 0 1 0 0-3.25a1.625 1.625 0 0 0 0 3.25Zm0 1a2.625 2.625 0 1 0 0-5.25a2.625 2.625 0 0 0 0 5.25Z" clip-rule="evenodd"/></svg> Polymath
          </span>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-5xl font-instrument-serif italic font-medium text-title dark:text-gray-50 tracking-wide transition-colors duration-300">
              Md Taqui Imam
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="#2db6f0"
              className="hover:rotate-360 transition-all duration-300 "
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                fill="#2db6f0"
                d="M15.616 3.268L12 .186L8.383 3.268l-4.737.378l-.378 4.737L.186 12l3.082 3.617l.378 4.737l4.737.378l3.616 3.082l3.617-3.082l4.737-.378l.378-4.737L23.813 12l-3.082-3.617l-.378-4.737zM11 16.414L6.585 12L8 10.586l3 3l5.5-5.5L17.914 9.5z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroName;
