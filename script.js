const openToWork = true;

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const downloadCV = document.getElementById('downloadCV');
    const contactForm = document.getElementById('contactForm');
    const skillBars = document.querySelectorAll('.skill-progress');
    const heroTitle = document.querySelector('.name');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (openToWork) {
        createOpenToWorkBadge();
    }
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    createTechMarquee();
    createParticles();
    createCodeRain();
    createBinaryRain();
    createCodeSnippets();
    createTerminal();
    createCircuitPattern();
    createCodeSymbols();
    createGitBranches();
    initTypingEffect();
    initParallax();
    initStaggerAnimations();
    initCounterAnimation();

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    downloadCV.addEventListener('click', function(e) {
        const cvPath = this.getAttribute('href');
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                skillObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        
        window.location.href = mailtoLink;

        contactForm.reset();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = '#10b981';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    function createParticles() {
        if (prefersReducedMotion.matches) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    function createCodeRain() {
        if (prefersReducedMotion.matches) return;
        
        const codeRain = document.getElementById('codeRain');
        if (!codeRain) return;

        const codeLines = [
            'const developer = {',
            'function createMagic() {',
            'class Portfolio {',
            'async function build() {',
            'export default Component',
            'import { useState }',
            'const [data, setData]',
            'return <div>',
            'useEffect(() => {',
            'const response = await fetch',
            'console.log("Hello World")',
            'npm install',
            'git commit -m',
            'docker build .',
            'kubectl apply -f',
            'dotnet ef migrations add',
            'dotnet ef database update',
            'dotnet build',
            'dotnet run',
            'dotnet publish',
            'dotnet restore',
            'dotnet test',
            'dotnet ef migrations remove',
            'git add .',
            'git push origin main',
            'git pull origin develop',
            'git checkout -b feature',
            'git merge develop',
            'git rebase main',
            'dotnet ef dbcontext scaffold',
            'dotnet ef migrations list',
            'dotnet ef database drop',
            'dotnet clean',
            'dotnet sln add',
            'dotnet new webapi',
            'dotnet new mvc',
            'dotnet add package',
            'git status',
            'git log --oneline',
            'git branch',
            'git stash',
            'git stash pop'
        ];

        for (let i = 0; i < 25; i++) {
            const line = document.createElement('div');
            line.className = 'code-line';
            line.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
            line.style.left = Math.random() * 100 + '%';
            line.style.animationDuration = (Math.random() * 10 + 15) + 's';
            line.style.animationDelay = Math.random() * 10 + 's';
            codeRain.appendChild(line);
        }
    }

    function createBinaryRain() {
        if (prefersReducedMotion.matches) return;
        
        const binaryRain = document.getElementById('binaryRain');
        if (!binaryRain) return;

        const binaryChars = ['0', '1'];
        const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

        for (let i = 0; i < 30; i++) {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = Math.random() > 0.5 
                ? binaryChars[Math.floor(Math.random() * binaryChars.length)]
                : hexChars[Math.floor(Math.random() * hexChars.length)];
            digit.style.left = Math.random() * 100 + '%';
            digit.style.animationDuration = (Math.random() * 8 + 12) + 's';
            digit.style.animationDelay = Math.random() * 8 + 's';
            binaryRain.appendChild(digit);
        }
    }

    function createCodeSnippets() {
        if (prefersReducedMotion.matches) return;
        
        const codeSnippets = document.getElementById('codeSnippets');
        if (!codeSnippets) return;

        const snippets = [
            '{ }',
            '[ ]',
            '( )',
            '< />',
            '=>',
            '...',
            '&&',
            '||',
            '===',
            '!==',
            '++',
            '--',
            '=>',
            '...props',
            '{...state}',
            'public class',
            'private void',
            'async Task',
            'DbContext',
            'IEnumerable',
            'List<T>',
            'using System',
            'namespace',
            '[HttpGet]',
            '[HttpPost]',
            'var result =',
            'await context',
            'dbContext.SaveChanges()',
            'AddMigration',
            'Update-Database'
        ];

        for (let i = 0; i < 20; i++) {
            const snippet = document.createElement('div');
            snippet.className = 'code-snippet';
            snippet.textContent = snippets[Math.floor(Math.random() * snippets.length)];
            snippet.style.left = Math.random() * 80 + '%';
            snippet.style.top = Math.random() * 80 + '%';
            snippet.style.animationDelay = Math.random() * 5 + 's';
            snippet.style.animationDuration = (Math.random() * 10 + 15) + 's';
            codeSnippets.appendChild(snippet);
        }
    }

    function createTerminal() {
        if (prefersReducedMotion.matches) return;
        
        const terminalContainer = document.getElementById('globalTerminal');
        if (!terminalContainer) return;

        const terminal = document.createElement('div');
        terminal.className = 'terminal-window';
        
        const header = document.createElement('div');
        header.className = 'terminal-header';
        header.innerHTML = `
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <div class="terminal-dot"></div>
            <span style="margin-left: 8px; color: #888; font-size: 10px;">Terminal</span>
        `;
        
        const content = document.createElement('div');
        content.className = 'terminal-content';
        content.innerHTML = '';
        
        terminal.appendChild(header);
        terminal.appendChild(content);
        terminalContainer.appendChild(terminal);

        const commandGroups = [
            [
                { text: '$ dotnet ef migrations add InitialCreate', delay: 1000 },
                { text: 'Build started...', delay: 500 },
                { text: 'Build succeeded.', delay: 500 },
                { text: 'Done. To undo this action, use \'ef migrations remove\'', delay: 800 },
                { text: '', delay: 600 },
                { text: '$ dotnet ef database update', delay: 1000 },
                { text: 'Applying migration \'InitialCreate\'...', delay: 800 },
                { text: 'Done.', delay: 500 }
            ],
            [
                { text: '$ dotnet build', delay: 800 },
                { text: 'MSBuild version 17.3.0+', delay: 500 },
                { text: 'Build started...', delay: 500 },
                { text: 'Build succeeded.', delay: 500 },
                { text: '    0 Warning(s)', delay: 400 },
                { text: '    0 Error(s)', delay: 400 }
            ],
            [
                { text: '$ git status', delay: 800 },
                { text: 'On branch main', delay: 500 },
                { text: 'Changes not staged for commit:', delay: 500 },
                { text: '  modified:   Portfolio.csproj', delay: 500 },
                { text: '', delay: 600 },
                { text: '$ git add .', delay: 800 },
                { text: '', delay: 500 },
                { text: '$ git commit -m "feat: add portfolio website"', delay: 1200 },
                { text: '[main a1b2c3d] feat: add portfolio website', delay: 600 },
                { text: ' 5 files changed, 234 insertions(+)', delay: 500 },
                { text: '', delay: 600 },
                { text: '$ git push origin main', delay: 1000 },
                { text: 'Enumerating objects: 15, done.', delay: 600 },
                { text: 'Counting objects: 100% (15/15), done.', delay: 600 },
                { text: 'Writing objects: 100% (8/8), done.', delay: 600 },
                { text: 'To https://github.com/user/portfolio.git', delay: 600 },
                { text: '   e4f5g6h..a1b2c3d  main -> main', delay: 600 }
            ],
            [
                { text: '$ dotnet run', delay: 800 },
                { text: 'info: Microsoft.Hosting.Lifetime[14]', delay: 500 },
                { text: '      Now listening on: https://localhost:5001', delay: 600 },
                { text: 'info: Microsoft.Hosting.Lifetime[0]', delay: 500 },
                { text: '      Application started. Press Ctrl+C to shut down.', delay: 800 }
            ]
        ];

        let currentGroupIndex = 0;
        let currentCommandIndex = 0;
        let isTyping = false;

        function clearTerminal() {
            content.innerHTML = '';
            currentCommandIndex = 0;
            content.scrollTop = 0;
        }

        function typeCommand(commandObj, commands) {
            if (isTyping) return;
            isTyping = true;

            const line = document.createElement('div');
            line.className = 'terminal-line';
            const hasPrompt = commandObj.text.startsWith('$');
            line.innerHTML = hasPrompt 
                ? '<span class="terminal-prompt">$ </span><span class="terminal-text"></span><span class="terminal-cursor"></span>'
                : '<span class="terminal-text"></span>';
            content.appendChild(line);

            const textSpan = line.querySelector('.terminal-text');
            const cursor = line.querySelector('.terminal-cursor');
            const fullText = commandObj.text.replace('$ ', '');

            if (hasPrompt) {
                let charIndex = 0;
                const typeChar = () => {
                    if (charIndex < fullText.length) {
                        textSpan.textContent += fullText[charIndex];
                        charIndex++;
                        setTimeout(typeChar, 50);
                    } else {
                        isTyping = false;
                        if (cursor) cursor.style.display = 'none';
                        setTimeout(() => {
                            content.scrollTop = content.scrollHeight;
                        }, 100);
                        
                        if (currentCommandIndex < commands.length - 1) {
                            currentCommandIndex++;
                            setTimeout(() => {
                                if (commands[currentCommandIndex].text === '') {
                                    const emptyLine = document.createElement('div');
                                    emptyLine.className = 'terminal-line';
                                    emptyLine.style.height = '4px';
                                    content.appendChild(emptyLine);
                                    currentCommandIndex++;
                                    if (currentCommandIndex >= commands.length) {
                                        setTimeout(() => {
                                            clearTerminal();
                                            currentGroupIndex = (currentGroupIndex + 1) % commandGroups.length;
                                            setTimeout(() => {
                                                typeCommand(commandGroups[currentGroupIndex][0], commandGroups[currentGroupIndex]);
                                            }, 1500);
                                        }, 1500);
                                        return;
                                    }
                                }
                                typeCommand(commands[currentCommandIndex], commands);
                            }, commandObj.delay);
                        } else {
                            setTimeout(() => {
                                clearTerminal();
                                currentGroupIndex = (currentGroupIndex + 1) % commandGroups.length;
                                setTimeout(() => {
                                    typeCommand(commandGroups[currentGroupIndex][0], commandGroups[currentGroupIndex]);
                                }, 1500);
                            }, 1500);
                        }
                    }
                };
                setTimeout(typeChar, 100);
            } else {
                textSpan.textContent = commandObj.text;
                if (cursor) cursor.style.display = 'none';
                isTyping = false;
                setTimeout(() => {
                    content.scrollTop = content.scrollHeight;
                }, 100);
                
                if (currentCommandIndex < commands.length - 1) {
                    currentCommandIndex++;
                    setTimeout(() => {
                        if (commands[currentCommandIndex].text === '') {
                            const emptyLine = document.createElement('div');
                            emptyLine.className = 'terminal-line';
                            emptyLine.style.height = '4px';
                            content.appendChild(emptyLine);
                            currentCommandIndex++;
                            if (currentCommandIndex >= commands.length) {
                                setTimeout(() => {
                                    clearTerminal();
                                    currentGroupIndex = (currentGroupIndex + 1) % commandGroups.length;
                                    setTimeout(() => {
                                        typeCommand(commandGroups[currentGroupIndex][0], commandGroups[currentGroupIndex]);
                                    }, 1500);
                                }, 1500);
                                return;
                            }
                        }
                        typeCommand(commands[currentCommandIndex], commands);
                    }, commandObj.delay);
                } else {
                    setTimeout(() => {
                        clearTerminal();
                        currentGroupIndex = (currentGroupIndex + 1) % commandGroups.length;
                        setTimeout(() => {
                            typeCommand(commandGroups[currentGroupIndex][0], commandGroups[currentGroupIndex]);
                        }, 1500);
                    }, 1500);
                }
            }
        }

        setTimeout(() => {
            typeCommand(commandGroups[0][0], commandGroups[0]);
        }, 2000);
    }

    function createCircuitPattern() {
        if (prefersReducedMotion.matches) return;
        
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const circuit = document.createElement('div');
        circuit.className = 'circuit-pattern';
        hero.appendChild(circuit);
    }

    function createCodeSymbols() {
        if (prefersReducedMotion.matches) return;
        
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const symbols = ['{', '}', '[', ']', '(', ')', '<', '>', '/', '\\', '|', '&', '*', '#', '@'];
        
        for (let i = 0; i < 20; i++) {
            const symbol = document.createElement('div');
            symbol.className = 'code-symbol';
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.left = Math.random() * 100 + '%';
            symbol.style.top = Math.random() * 100 + '%';
            symbol.style.animationDelay = Math.random() * 5 + 's';
            symbol.style.animationDuration = (Math.random() * 10 + 15) + 's';
            hero.appendChild(symbol);
        }
    }

    function createGitBranches() {
        if (prefersReducedMotion.matches) return;
        
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const branches = [
            'main →',
            'feature/new-design →',
            'develop →',
            'hotfix/bug-fix →',
            'release/v1.0 →'
        ];

        for (let i = 0; i < 5; i++) {
            const branch = document.createElement('div');
            branch.className = 'git-branch';
            branch.textContent = branches[i];
            branch.style.top = (20 + i * 15) + '%';
            branch.style.animationDelay = i * 2 + 's';
            hero.appendChild(branch);
        }
    }

    function initTypingEffect() {
        if (!heroTitle || prefersReducedMotion.matches) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typing-effect');
        
        let i = 0;
        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    heroTitle.classList.remove('typing-effect');
                }, 1000);
            }
        }
        
        setTimeout(type, 1000);
    }

    function initParallax() {
        if (prefersReducedMotion.matches) return;
        
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (hero && heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    function initStaggerAnimations() {
        if (prefersReducedMotion.matches) return;
        
        const timelineItems = document.querySelectorAll('.timeline-item');
        const projectCards = document.querySelectorAll('.project-card');
        const skillCategories = document.querySelectorAll('.skill-category');
        const statItems = document.querySelectorAll('.stat-item');

        const staggerObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        [...timelineItems, ...projectCards, ...skillCategories].forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            staggerObserver.observe(el);
        });

        statItems.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.5)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            staggerObserver.observe(el);
        });
    }

    function initCounterAnimation() {
        if (prefersReducedMotion.matches) return;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/\d/g, '');
                    
                    if (!isNaN(number)) {
                        let current = 0;
                        const increment = number / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                current = number;
                                clearInterval(timer);
                            }
                            target.textContent = Math.floor(current) + suffix;
                        }, 30);
                    }
                    
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => {
            counterObserver.observe(num);
        });
    }

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    function createOpenToWorkBadge() {
        const navBadge = document.getElementById('openToWorkNav');
        const heroBadge = document.getElementById('openToWorkHero');
        
        if (navBadge) {
            navBadge.innerHTML = `
                <div class="open-to-work-badge">
                    <span class="open-to-work-dot"></span>
                    <span class="open-to-work-text">Open to Work</span>
                </div>
            `;
        }
        
        if (heroBadge) {
            heroBadge.innerHTML = `
                <div class="open-to-work-badge-large">
                    <span class="open-to-work-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                    </span>
                    <span class="open-to-work-text-large">Open to Work</span>
                    <span class="open-to-work-subtitle">Available for new opportunities</span>
                </div>
            `;
        }
    }

    function createTechMarquee() {
        const techIcons = {
            'C#': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.568 8.16c-.169 0-.306.042-.41.125a.582.582 0 0 0-.16.388v6.854a.582.582 0 0 0 .16.388c.104.083.241.125.41.125.168 0 .305-.042.409-.125a.582.582 0 0 0 .16-.388V8.673a.582.582 0 0 0-.16-.388c-.104-.083-.241-.125-.409-.125zm-11.136 0c-.168 0-.305.042-.409.125a.582.582 0 0 0-.16.388v6.854c0 .15.053.283.16.388.104.083.241.125.409.125.169 0 .306-.042.41-.125a.582.582 0 0 0 .16-.388V8.673a.582.582 0 0 0-.16-.388c-.104-.083-.241-.125-.41-.125z"/></svg>',
            'React': '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#61DAFB"/></svg>',
            'Next.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.5725 0c-.1763 0-.3125.1362-.3125.3125v23.375c0 .1763.1362.3125.3125.3125h.8675c.1763 0 .3125-.1362.3125-.3125V.3125C12.7525.1362 12.6163 0 12.44 0h-.8675zm8.1632 4.4186c-.1303-.0008-.2632.0418-.3775.1303L7.0918 13.7818c-.1047.0803-.1672.2008-.1672.3303s.0625.25.1672.3303l12.2664 9.2329c.2283.1717.5572.1299.7289-.0984.1717-.2283.1299-.5572-.0984-.7289L8.155 14.1121l11.833-8.9062c.2283-.1717.2701-.5006.0984-.7289-.1047-.1399-.2632-.2099-.4227-.2099zm-16.3264 0c-.1595 0-.318.07-.4227.2099-.1717.2283-.1299.5572.0984.7289l11.833 8.9062-11.833 8.9062c-.2283.1717-.2701.5006-.0984.7289.1047.1399.2632.2099.4227.2099.1143 0 .2286-.0411.3229-.1303L16.9082 14.4424c.1047-.0803.1672-.2008.1672-.3303s-.0625-.25-.1672-.3303L4.5416 4.5489c-.0943-.0892-.2086-.1303-.3229-.1303z" fill="#000"/></svg>',
            'SQL Server': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#CC2927"/></svg>',
            'gRPC': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#244C5A"/></svg>',
            'REST API': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
            'Redis': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#DC382D"/></svg>',
            'RabbitMQ': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF6600"/></svg>',
            'Kafka': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#231F20"/></svg>',
            'ASP.NET Core': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#512BD4"/></svg>',
            'Entity Framework': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#512BD4"/></svg>',
            'TypeScript': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.375.222.695.473.96.753.264.279.472.598.623.957.15.359.226.776.226 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 7.53 7.53 0 0 0-1.009-.436c-.395-.15-.813-.319-1.253-.505a5.022 5.022 0 0 1-1.047-.623 3.214 3.214 0 0 1-.726-.9 2.587 2.587 0 0 1-.263-1.212c0-.514.123-.96.369-1.34.246-.382.58-.693 1.002-.933.423-.24.91-.417 1.463-.532.552-.115 1.13-.173 1.736-.173zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" fill="#3178C6"/></svg>',
            'JavaScript': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.337-.404-.6-.586-1.037-.842-1.6-2.6-2.278-3.54-2.79-.896-.48-1.95-.84-2.876-.705-.405.075-.78.24-1.11.48-.33.24-.585.57-.75.96-.36.78-.27 1.92.24 2.7.855 1.26 2.46 2.04 4.26 2.58 1.8.54 3.57 1.08 5.19 1.77 1.62.69 2.88 1.62 3.54 3.03.66 1.41.51 3.3-.39 4.5-.9 1.2-2.58 1.98-4.68 2.31-.42.06-.84.09-1.26.09-1.5 0-2.94-.24-4.2-.69-1.26-.45-2.4-1.14-3.3-2.04-.9-.9-1.59-2.04-2.04-3.3-.45-1.26-.69-2.7-.69-4.2 0-1.5.24-2.94.69-4.2.45-1.26 1.14-2.4 2.04-3.3.9-.9 2.04-1.59 3.3-2.04 1.26-.45 2.7-.69 4.2-.69 1.5 0 2.94.24 4.2.69 1.26.45 2.4 1.14 3.3 2.04.9.9 1.59 2.04 2.04 3.3.45 1.26.69 2.7.69 4.2 0 .42-.03.84-.09 1.26z" fill="#F7DF1E"/></svg>',
            'Node.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#339933"/></svg>',
            'Docker': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.278l2.72-2.66h-2.72v2.66zm5.315 0l2.72-2.66h-2.72v2.66zm-5.315 3.19l2.72 2.66h-2.72v-2.66zm5.315 0l2.72 2.66h-2.72v-2.66zM24 13.48v-2.96h-2.72l-2.72 2.66v2.66H24zm-24-2.96v2.96h2.72l2.72-2.66v-2.66H0zm13.983 0l-2.72-2.66h2.72v2.66zm-5.315 0L5.948 7.86h2.72v2.66zm5.315-3.19l-2.72-2.66h2.72v2.66zm-5.315 0L5.948 4.03h2.72v2.66zM0 10.52h2.72l2.72 2.66v2.66H0v-5.32zm24 0v5.32h-2.72l-2.72-2.66v-2.66H24z" fill="#2496ED"/></svg>',
            'Kubernetes': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.073 1.445h.001a1.8 1.8 0 0 1 1.44 0L21.01 7.2a1.8 1.8 0 0 1 .936 1.568v6.464a1.8 1.8 0 0 1-.936 1.568l-8.642 4.755a1.8 1.8 0 0 1-1.44 0L2.054 16.8a1.8 1.8 0 0 1-.936-1.568V8.768A1.8 1.8 0 0 1 2.054 7.2l8.873-4.755z" fill="#326CE5"/></svg>',
            'Azure': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#0078D4"/></svg>',
            'AWS': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#FF9900"/></svg>',
            'Git': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#F05032"/></svg>',
            'MongoDB': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.533 5.682-4.533 10.343 0 1.766.695 3.482 1.82 4.861.577.732 1.218 1.314 1.895 1.751-.196.407-.336.806-.336 1.185 0 .315.12.615.33.861.21.246.5.39.81.39.21 0 .405-.055.57-.15.165-.09.3-.21.39-.345.09-.135.135-.285.135-.435 0-.18-.06-.36-.165-.51-.105-.15-.255-.27-.42-.345.42-.27.81-.615 1.14-1.02 1.125-1.38 1.815-3.096 1.815-4.861 0-4.661-3.81-9.777-4.533-10.343-.468-.499-.487-.689-.523-1.184.205.486.455 1.046.735 1.44.321.701 3.309 2.535 4.573 8.115z" fill="#47A248"/></svg>',
            'PostgreSQL': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5597 9.7207c-.1038-1.4507-.3047-2.7842-.3047-2.7842s-1.3594-.1038-2.7842-.2076c-.2076-1.4507-.5189-2.9014-.9336-4.2486-.2076-.7259-.5189-1.3473-.9336-1.9687C17.3047.2076 15.8539 0 14.4032 0c-1.4507 0-2.9014.2076-4.2486.5189-.6214.4147-1.2428.8303-1.9687 1.0379-1.3473.4147-2.798.7259-4.2486.9336C2.4759 2.4759 1.1165 2.5797 1.1165 2.5797s-.2076 1.3335-.3114 2.7842c-.1038 1.4507-.2076 2.9014-.2076 4.3521 0 1.4507.1038 2.9014.2076 4.3521.1038 1.4507.2076 2.7842.2076 2.7842s1.3594.1038 2.7842.2076c.2076 1.4507.5189 2.9014.9336 4.2486.2076.7259.5189 1.3473.9336 1.9687C7.6953 23.7924 9.1461 24 10.5958 24c1.4507 0 2.9014-.2076 4.2486-.5189.6214-.4147 1.2428-.8303 1.9687-1.0379 1.3473-.4147 2.798-.7259 4.2486-.9336 1.4248-.1038 2.7842-.2076 2.7842-.2076s.2076-1.3335.3114-2.7842c.1038-1.4507.2076-2.9014.2076-4.3521 0-1.4507-.1038-2.9014-.2076-4.3521zm-3.5189 7.4492c-.2076.2076-.5189.3114-.9336.3114-.4147 0-.7259-.1038-.9336-.3114-.2076-.2076-.3114-.5189-.3114-.9336 0-.4147.1038-.7259.3114-.9336.2076-.2076.5189-.3114.9336-.3114.4147 0 .7259.1038.9336.3114.2076.2076.3114.5189.3114.9336 0 .4147-.1038.7259-.3114.9336z" fill="#336791"/></svg>',
            'MySQL': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.501c-1.512 0-3.015.804-3.877 2.184-.863-1.38-2.365-2.184-3.877-2.184-2.582 0-4.524 2.31-4.524 5.415 0 3.096 1.942 5.407 4.524 5.407.862 0 1.667-.3 2.316-.84l-.014.014c.528-.528.863-1.234.863-2.017 0-.783-.335-1.489-.863-2.017l-.014.014c.649-.54 1.454-.84 2.316-.84 1.512 0 3.015.804 3.877 2.184.863-1.38 2.365-2.184 3.877-2.184 2.582 0 4.524 2.31 4.524 5.415 0 3.096-1.942 5.407-4.524 5.407-.862 0-1.667-.3-2.316-.84l.014.014c-.528.528-.863 1.234-.863 2.017 0 .783.335 1.489.863 2.017l.014-.014c-.649.54-1.454.84-2.316.84-1.512 0-3.015-.804-3.877-2.184-.863 1.38-2.365 2.184-3.877 2.184-2.582 0-4.524-2.31-4.524-5.407 0-3.096 1.942-5.415 4.524-5.415 1.512 0 3.015.804 3.877 2.184.863-1.38 2.365-2.184 3.877-2.184.862 0 1.667.3 2.316.84l-.014-.014c.528.528.863 1.234.863 2.017 0 .783-.335 1.489-.863 2.017l.014.014c-.649.54-1.454.84-2.316.84z" fill="#4479A1"/></svg>',
            'GraphQL': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#E10098"/></svg>',
            'Jenkins': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#D24939"/></svg>',
            'GitHub Actions': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#2088FF"/></svg>',
            'Vue.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 1.61H14.06L12 5.16 9.94 1.61H0L12 22.39zM12 14.08L5.16 2.23H9.59L12 6.41l2.41-4.18h4.43z" fill="#4FC08D"/></svg>',
            'Angular': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.96 21.54l.96-5.18-4.5-4.34 6.12-.55L12 2.5l2.46 8.97 6.12.55-4.5 4.34.96 5.18L12 17.77z" fill="#DD0031"/></svg>',
            'Python': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.34 0H9.66C4.5 0 0 4.5 0 9.66v4.68C0 19.5 4.5 24 9.66 24h4.68C19.5 24 24 19.5 24 14.34V9.66C24 4.5 19.5 0 14.34 0zm-1.5 2.25h3c.75 0 1.5.75 1.5 1.5v1.5c0 .75-.75 1.5-1.5 1.5h-3c-.75 0-1.5-.75-1.5-1.5v-1.5c0-.75.75-1.5 1.5-1.5zm-6 15h-3c-.75 0-1.5-.75-1.5-1.5v-1.5c0-.75.75-1.5 1.5-1.5h3c.75 0 1.5.75 1.5 1.5v1.5c0 .75-.75 1.5-1.5 1.5z" fill="#3776AB"/></svg>',
            'Java': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.851 18.56s-.849.478.595.642c1.751.151 2.98.128 5.137-.096.928-.096 1.945-.19 2.95-.38.47-.09.945-.19 1.421-.29.048-.01.048-.01 0-.01-.048 0-.048.01 0 .01-.476.1-.951.2-1.421.29-1.01.19-2.022.284-2.95.38-2.157.224-3.386.247-5.137.096-1.444-.164-.595-.642zm-.758-2.431s-.943.718.531.943c1.751.224 3.386.224 5.522 0 .428-.048.943-.096 1.458-.143.048 0 .048 0 0-.01-.048 0-.048 0 0 .01.515.047 1.03.095 1.458.143 2.136.224 3.771.224 5.522 0 1.474-.225.531-.943-.943-.718-2.136-.287-4.08-.335-6.023-.287-.048 0-.048 0 0 .01.048 0 .048 0 0-.01-1.943-.048-3.887 0-6.023.287-1.474.225-.943.718.531.943zm-2.664-3.298s-1.269 1.01.755 1.269c2.136.287 4.559.287 6.695 0 .428-.048.943-.096 1.458-.143.048 0 .048 0 0-.01-.048 0-.048 0 0 .01.515.047 1.03.095 1.458.143 2.136.287 4.559.287 6.695 0 2.024-.259.755-1.269-1.269-1.01-2.45-.335-5.137-.335-7.629 0-.048 0-.048 0 0 .01.048 0 .048 0 0-.01-2.492 0-5.179 0-7.629 0-2.024.259-1.269 1.01.755 1.269zm14.142-5.327c.755 1.01-.189 1.918-.755 2.136-.943.335-2.45.531-2.45.531s.472-.566.283-1.269c-.189-.566-.849-1.01-1.269-1.269-.755-.428-1.458-.566-1.458-1.01 0-.428.755-.943 1.458-1.458 1.269-.755 2.45-1.01 2.45-1.01s-.189 1.01.755 1.458c.943.428 1.458 1.01 1.458 1.458 0 .428-.189.943-.472 1.443z" fill="#ED8B00"/></svg>',
            'Spring Boot': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#6DB33F"/></svg>',
            '.NET': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#512BD4"/></svg>',
            'Blazor': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#512BD4"/></svg>',
            'SignalR': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#512BD4"/></svg>',
            'WebSocket': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#010101"/></svg>',
            'Elasticsearch': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#005571"/></svg>',
            'Docker Compose': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.278l2.72-2.66h-2.72v2.66zm5.315 0l2.72-2.66h-2.72v2.66zm-5.315 3.19l2.72 2.66h-2.72v-2.66zm5.315 0l2.72 2.66h-2.72v-2.66zM24 13.48v-2.96h-2.72l-2.72 2.66v2.66H24zm-24-2.96v2.96h2.72l2.72-2.66v-2.66H0zm13.983 0l-2.72-2.66h2.72v2.66zm-5.315 0L5.948 7.86h2.72v2.66zm5.315-3.19l-2.72-2.66h2.72v2.66zm-5.315 0L5.948 4.03h2.72v2.66zM0 10.52h2.72l2.72 2.66v2.66H0v-5.32zm24 0v5.32h-2.72l-2.72-2.66v-2.66H24z" fill="#2496ED"/></svg>',
            'Microservices': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#6366F1"/></svg>',
            'CI/CD': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z" fill="#2088FF"/></svg>'
        };

        const technologies = [
            'C#', 'React', 'Next.js', 'SQL Server', 'gRPC', 'REST API',
            'Redis', 'RabbitMQ', 'Kafka', 'ASP.NET Core', 'Entity Framework',
            'TypeScript', 'JavaScript', 'Node.js', 'Docker', 'Kubernetes',
            'Azure', 'AWS', 'Git', 'MongoDB', 'PostgreSQL', 'MySQL',
            'GraphQL', 'Microservices', 'CI/CD', 'Jenkins', 'GitHub Actions',
            'Vue.js', 'Angular', 'Python', 'Java', 'Spring Boot', '.NET',
            'Blazor', 'SignalR', 'WebSocket', 'Elasticsearch', 'Docker Compose'
        ];

        const marquee1 = document.getElementById('techMarquee1');
        const marquee2 = document.getElementById('techMarquee2');

        if (!marquee1 || !marquee2) return;

        function createTechTag(tech) {
            const techTag = document.createElement('div');
            techTag.className = 'tech-tag';
            
            const icon = techIcons[tech];
            if (icon) {
                const iconWrapper = document.createElement('span');
                iconWrapper.className = 'tech-icon';
                iconWrapper.innerHTML = icon;
                techTag.appendChild(iconWrapper);
            }
            
            const textSpan = document.createElement('span');
            textSpan.className = 'tech-text';
            textSpan.textContent = tech;
            techTag.appendChild(textSpan);
            
            return techTag;
        }

        technologies.forEach((tech) => {
            marquee1.appendChild(createTechTag(tech));
            marquee2.appendChild(createTechTag(tech));
        });
    }
});