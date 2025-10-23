class Theme {
    constructor() {
        this.btn = document.getElementById('theme');
        this.body = document.body;
        this.cur = localStorage.getItem('ggr-theme') || 'dark';
        this.apply(this.cur);
        this.btn.addEventListener('click', () => this.toggle());
    }
    apply(theme) {
        if (theme === 'light') {
            this.body.setAttribute('data-theme', 'light');
            this.btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            this.body.removeAttribute('data-theme');
            this.btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
        this.cur = theme;
        localStorage.setItem('ggr-theme', theme);
    }
    toggle() {
        const next = this.cur === 'light' ? 'dark' : 'light';
        this.apply(next);
    }
}

class Nav {
    constructor() {
        this.links = document.querySelectorAll('.nav-link');
        this.hamb = document.getElementById('hamb');
        this.menu = document.querySelector('.menu-links');
        this.bind();
    }
    bind() {
        this.links.forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const id = a.getAttribute('href');
                const el = document.querySelector(id);
                if (el) {
                    const offset = window.innerWidth < 480 ? 64 : 72;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                this.close();
            });
        });
        this.hamb.addEventListener('click', () => this.toggle());
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 860 && this.menu && !e.target.closest('.menu')) {
                this.close();
            }
        });
    }
    toggle() {
        if (!this.menu) return;
        this.menu.classList.toggle('show');
    }
    close() {
        if (!this.menu) return;
        this.menu.classList.remove('show');
    }
}

class Reveal {
    constructor() {
        this.ob = new IntersectionObserver((en) => this.on(en), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.card, .item').forEach(el => this.ob.observe(el));
    }
    on(entries) {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('fade-in-up');
                this.ob.unobserve(e.target);
            }
        });
    }
}

class Projects {
    constructor() {
        this.el = document.getElementById('grid');
        this.data = [
            { id: 'ttt',    title: 'Tic‑Tac‑Toe‑JS', desc: 'Jogo da velha minimalista em JS.', tags: ['HTML', 'CSS', 'JS'], image: 'img/imgTicTacToe.png', demo: 'https://tic-tac-toe-js-phi.vercel.app/', repo: 'https://github.com/Gogzzzs/Tic-Tac-Toe-JS' },
            { id: 'todo',   title: 'To‑do‑List‑JS',  desc: 'Lista de tarefas com persistência local.', tags: ['HTML', 'CSS', 'JS'], image: 'img/imgToDoList.png', demo: 'https://to-do-list-js-omega-nine.vercel.app/', repo: 'https://github.com/Gogzzzs/To-do-List-JS' },
            { id: 'lib',    title: 'digital‑library‑js', desc: 'Catálogo com busca; front puro + API Node.', tags: ['HTML', 'CSS', 'JS', 'Node', 'SQL'], image: 'img/imgDigitalLibrary.png', demo: 'https://digital-library-js.onrender.com/', repo: 'https://github.com/Gogzzzs/digital-library-js' }
        ];
        this.render();
    }
    render() {
        this.el.innerHTML = '';
        this.data.forEach(p => this.el.appendChild(this.card(p)));
    }
    card(p) {
        const a = document.createElement('article');
        a.className = 'card item';
        const thumbContent = p.image 
            ? `<img src="${p.image}" alt="${p.title}" />`
            : `<div class="thumb-placeholder">${p.title}</div>`;
        a.innerHTML = `
            <div class="thumb">${thumbContent}</div>
            <div class="pad">
                <h3 style="margin:.6rem 0 .2rem">${p.title}</h3>
                <p class="sec-sub" style="margin:0 0 .6rem">${p.desc}</p>
                <div class="tags">${p.tags.map(t => `<span class='tag'>${t}</span>`).join('')}</div>
                <div class="links">
                    <a class="btn" href="${p.demo}" target="_blank" rel="noreferrer"><i class="fa-solid fa-up-right-from-square"></i> Demo</a>
                    <a class="btn ghost" href="${p.repo}" target="_blank" rel="noreferrer"><i class="fa-brands fa-github"></i> Código</a>
                </div>
            </div>`;
        a.addEventListener('mouseenter', () => a.classList.add('glow'));
        a.addEventListener('mouseleave', () => a.classList.remove('glow'));
        return a;
    }
}

class FooterYear {
    constructor() {
        const y = document.getElementById('y');
        y.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Theme();
    new Nav();
    new Reveal();
    new Projects();
    new FooterYear();
    const hero = document.querySelectorAll('.hero > *');
    hero.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        setTimeout(() => {
            el.style.transition = 'opacity .6s ease, transform .6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 120);
    });
});