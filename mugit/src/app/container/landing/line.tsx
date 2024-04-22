'use client'

export default function Line() {
  return (
    <div className="w-screen h-1 bg-[#121214]  border-animate">
      <style jsx>{`
        @keyframes borderSlide {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .border-animate {
          @apply overflow-hidden;
        }
        .border-animate::before {
          content: "";
          display: block;
          height: 8px;
          /* height: 7px; 동일한 테두리 두께 */
          background-color: #f1f609; /* 동일한 테두리 색상 */
          animation: borderSlide 2s forwards; /* 애니메이션 이름, 지속 시간, 반복 방식 */
        }
      `}</style>
    </div>
  );
};