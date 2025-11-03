// =======================================================
// 1. 부드러운 스크롤 (Smooth Scroll)
// =======================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href');
    
    // 타겟 ID가 '#'만 아니며, 페이지에 해당 요소가 존재할 경우 실행
    if (targetId.length > 1 && document.querySelector(targetId)){
      e.preventDefault();
      
      // 해당 요소로 부드럽게 스크롤
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth'});
      
      // 모바일 메뉴가 열려 있다면 닫음 (스크롤 후 화면 정리)
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.classList.remove('open');
      }
    }
  });
});

// =======================================================
// 2. 모바일 내비게이션 토글 (Mobile Nav Toggle)
// =======================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks){
  navToggle.addEventListener('click', ()=> {
    navLinks.classList.toggle('open');
  });
}

// =======================================================
// 3. Contact Form (Fake Submit & Validation)
//    - 실제 백엔드 없이 클라이언트 측에서만 동작합니다.
// =======================================================

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

// 이메일 형식 검증 함수
function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form && statusEl){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    // 입력 값 가져오기
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // 1차: 필수 필드 검사
    if (!name || !email || !message){
      statusEl.textContent = '모든 필드를 입력해주세요. (이름, 이메일, 메시지)';
      statusEl.className = 'status err';
      return;
    }
    
    // 2차: 이메일 형식 검사
    if (!isEmail(email)){
      statusEl.textContent = '이메일 형식이 올바르지 않습니다.';
      statusEl.className = 'status err';
      return;
    }

    // 모든 검증 통과: 성공 처리
    statusEl.textContent = '🎉 감사합니다! 메시지를 잘 받았습니다. (실제 전송은 되지 않습니다.)';
    statusEl.className = 'status ok';
    
    // 폼 초기화 및 성공 메시지 숨김
    form.reset();
    setTimeout(()=> statusEl.textContent = '', 4000); // 4초 후 메시지 삭제
  });
}
