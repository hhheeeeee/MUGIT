type PaginationProps = {
  totalPage: number;
};

function createArray(end: number): number[] {
  return Array.from({ length: end }, (_, index) => index + 1);
}

export default function Pagination({ totalPage }: PaginationProps) {
  const pageArray = createArray(totalPage);
  console.log(totalPage);
  return (
    <nav className="mx-auto">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>
        </li>
        {pageArray.map((item) => {
          return (
            <li key={item}>
              <a
                href="#"
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {item}
              </a>
            </li>
          );
        })}

        <li>
          <a
            href="#"
            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
