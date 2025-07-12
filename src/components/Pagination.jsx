import React from 'react';

export default function Pagination({ page, setPage, total, perPage }) {
  const pages = Math.ceil(total / perPage);
  if (pages < 2) return null;

  const items = [];
  for (let i = 1; i <= pages; i++) {
    items.push(
      <button
        key={i}
        onClick={() => setPage(i)}
        className={`px-3 py-1 border rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-white'}`}
      >
        {i}
      </button>
    );
  }

  return <div className="flex gap-2 my-4">{items}</div>;
}
