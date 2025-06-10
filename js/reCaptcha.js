const RECAPTCHA_SITE_KEY = '6Lfmz1srAAAAAK1hJXxtYFa_buyJO8edaAAgyr82';
        
        let recaptchaWidget;
        let isRecaptchaVerified = false;
        
        // Função chamada quando o reCAPTCHA carrega
        function onRecaptchaLoad() {
            recaptchaWidget = grecaptcha.render('recaptcha-widget', {
                'sitekey': RECAPTCHA_SITE_KEY,
                'callback': onRecaptchaSuccess,
                'expired-callback': onRecaptchaExpired,
                'error-callback': onRecaptchaError
            });
        }
        
        // Função chamada quando reCAPTCHA é resolvido com sucesso
        function onRecaptchaSuccess(token) {
            isRecaptchaVerified = true;
            const verifyButton = document.getElementById('verify-button');
            verifyButton.disabled = false;
            verifyButton.style.opacity = '1';
            verifyButton.style.cursor = 'pointer';
            console.log('reCAPTCHA verificado com sucesso!');
        }
        
        // Função chamada quando reCAPTCHA expira
        function onRecaptchaExpired() {
            isRecaptchaVerified = false;
            const verifyButton = document.getElementById('verify-button');
            verifyButton.disabled = true;
            verifyButton.style.opacity = '0.5';
            console.log('reCAPTCHA expirado. Tente novamente.');
        }
        
        // Função chamada quando há erro no reCAPTCHA
        function onRecaptchaError() {
            console.log('Erro no reCAPTCHA. Tente recarregar a página.');
            alert('Erro na verificação. Por favor, recarregue a página.');
        }
        
        // Função para verificar e liberar acesso
        function verifyAndEnter() {
            if (isRecaptchaVerified) {
                // Esconde o modal do reCAPTCHA
                document.getElementById('recaptcha-modal').style.display = 'none';
                // Mostra o conteúdo principal
                document.getElementById('main-content').style.display = 'block';
                
                console.log('Usuário verificado! Acesso liberado.');
                
                // Opcional: Enviar token para o servidor para validação
                const recaptchaToken = grecaptcha.getResponse(recaptchaWidget);
                console.log('Token reCAPTCHA:', recaptchaToken);
                
                // Aqui você pode fazer uma requisição para seu servidor
                // para verificar o token no backend se necessário
                
            } else {
                alert('Por favor, complete a verificação reCAPTCHA primeiro.');
            }
        }
        
        // Aguardar carregamento da página
        window.addEventListener('load', () => {
            // Configurar botão de verificação
            const verifyButton = document.getElementById('verify-button');
            verifyButton.addEventListener('click', verifyAndEnter);
            
            // Carregar reCAPTCHA após 1 segundo (para melhor UX)
            setTimeout(() => {
                if (typeof grecaptcha !== 'undefined') {
                    onRecaptchaLoad();
                } else {
                    console.error('reCAPTCHA não carregou. Verifique sua conexão.');
                }
            }, 1000);
        });