import React from 'react';
import './PaginationWithButtons.css';

// ButtonList 컴포넌트 정의
const ButtonList = ({ buttons }) => {
  return (
    <div className="button-container">
      {buttons.map((button, index) => (
        <div key={index} className="button-content">
          <div className="button-text">
            <h2 className="button-title">{button.title}</h2>
            <p className="button-subtitle">{button.subtitle}</p>
          </div>
          <img src={button.image} alt={button.title} className="button-image" />
        </div>
      ))}
    </div>
  );
};

// Pagination 컴포넌트 정의
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <span
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-text"
        style={{ color: currentPage === 1 ? '#999' : '#6562FF', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        &lt; {/* 이전 페이지로 가는 버튼 */}
      </span>
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`page-number ${index + 1 === currentPage ? 'active' : ''}`}
        >
          {index + 1} {/* 페이지 번호 */}
        </span>
      ))}
      <span
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-text"
        style={{ color: currentPage === totalPages ? '#999' : '#6562FF', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        &gt; {/* 다음 페이지로 가는 버튼 */}
      </span>
    </div>
  );
};

// 메인 컴포넌트 (페이지네이션과 버튼 리스트 포함)
const PaginationWithButtons = ({ currentPage, totalPages, onPageChange, buttons }) => {
  return (
    <div>
      <ButtonList buttons={buttons} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PaginationWithButtons;
