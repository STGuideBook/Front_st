import React, { useState } from 'react';
import axios from 'axios';
import './SignupModal.css';

const SignupModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
    student_id: '', // studentId -> student_id
  });

  const [errors, setErrors] = useState({
    username: '아이디를 입력하세요.',
    password1: '비밀번호를 입력하세요.',
    password2: '비밀번호를 다시 입력하세요.',
    student_id: '학번을 입력하세요.', // studentId -> student_id
  });

  const [validStates, setValidStates] = useState({
    username: false,
    password1: false,
    password2: false,
    student_id: false, // studentId -> student_id
  });

  const [isChecking, setIsChecking] = useState(false); // 중복확인 진행 상태

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };
    const newValidStates = { ...validStates };

    if (name === 'username') {
      newErrors.username = '아이디를 입력하세요.';
      newValidStates.username = false;
      setErrors(newErrors);
      setValidStates(newValidStates);
    }

    if (name === 'password1') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      if (!passwordRegex.test(value)) {
        newErrors.password1 = '비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자여야 합니다.';
        newValidStates.password1 = false;
      } else {
        newErrors.password1 = '사용 가능한 비밀번호입니다.';
        newValidStates.password1 = true;
      }
      setErrors(newErrors);
      setValidStates(newValidStates);
    }

    if (name === 'password2') {
      if (value !== formData.password1) {
        newErrors.password2 = '비밀번호가 일치하지 않습니다.';
        newValidStates.password2 = false;
      } else {
        newErrors.password2 = '비밀번호가 일치합니다.';
        newValidStates.password2 = true;
      }
      setErrors(newErrors);
      setValidStates(newValidStates);
    }

    if (name === 'student_id') {
      if (!/^\d{2}$/.test(value)) {
        newErrors.student_id = '학번은 2자리 숫자여야 합니다.';
        newValidStates.student_id = false;
      } else {
        newErrors.student_id = '올바른 학번입니다.';
        newValidStates.student_id = true;
      }
      setErrors(newErrors);
      setValidStates(newValidStates);
    }
  };

  const checkUsernameDuplicate = async () => {
    if (formData.username.length < 6 || formData.username.length > 20) {
      setErrors((prev) => ({
        ...prev,
        username: '아이디는 6~20자로 입력해주세요.',
      }));
      setValidStates((prev) => ({ ...prev, username: false }));
      return;
    }

    setIsChecking(true);
    try {
      await axios.post('https://stguidebook-649b3dde2d26.herokuapp.com/user/check-username', {
        username: formData.username,
      });

      setErrors((prev) => ({
        ...prev,
        username: '사용 가능한 아이디입니다.',
      }));
      setValidStates((prev) => ({ ...prev, username: true }));
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrors((prev) => ({
          ...prev,
          username: '이미 사용 중인 아이디입니다.',
        }));
        setValidStates((prev) => ({ ...prev, username: false }));
      } else {
        console.error('중복 확인 중 문제가 발생했습니다:', error);
        alert('중복 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(validStates).every(Boolean)) {
      try {
        const response = await axios.post(
          'https://stguidebook-649b3dde2d26.herokuapp.com/user/signup',
          {
            username: formData.username,
            password1: formData.password1,
            password2: formData.password2,
            student_id: formData.student_id, // studentId -> student_id
          }
        );
        alert('회원가입 성공!');
        closeModal();
      } catch (error) {
        console.error('회원가입 실패:', error);
        alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('모든 항목을 올바르게 입력하세요.');
    }
  };

  const isFormValid = Object.values(validStates).every(Boolean);

  return (
    <div className="signup-modal-overlay" onClick={handleOverlayClick}>
      <div className="signup-modal-content">
        <h2 className="signup-modal-title">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="username">
              아이디
              <span
                className={`signup-error ${
                  validStates.username ? 'signup-valid' : 'signup-invalid'
                }`}
              >
                {errors.username}
              </span>
            </label>
            <div className="signup-input-container">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="아이디 입력(6~20자)"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isChecking}
              />
              <button
                type="button"
                className={`signup-duplicate-btn ${
                  validStates.username ? 'signup-duplicate-btn-completed' : ''
                }`}
                onClick={checkUsernameDuplicate}
                disabled={isChecking || validStates.username}
              >
                {validStates.username ? '확인 완료' : isChecking ? '확인 중...' : '중복확인'}
              </button>
            </div>
          </div>
          {['password1', 'password2', 'student_id'].map((field) => (
            <div key={field} className="signup-form-group">
              <label htmlFor={field}>
                {field === 'password1' && '비밀번호'}
                {field === 'password2' && '비밀번호 확인'}
                {field === 'student_id' && '학번'}
                <span
                  className={`signup-error ${
                    validStates[field] ? 'signup-valid' : 'signup-invalid'
                  }`}
                >
                  {errors[field]}
                </span>
              </label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                id={field}
                name={field}
                placeholder={
                  field === 'password1'
                    ? '비밀번호 입력(영문, 숫자, 특수문자 포함 8~20자)'
                    : field === 'password2'
                    ? '비밀번호 다시 입력'
                    : '학번 입력(2자리, 예시: 23)'
                }
                value={formData[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button
            type="submit"
            className={`signup-btn ${isFormValid ? 'signup-btn-active' : 'signup-btn-inactive'}`}
            disabled={!isFormValid}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
