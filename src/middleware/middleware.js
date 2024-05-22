function verificarAutenticacao(req, res, next) {
    // Verifica se a sessão do usuário está definida
    if (req.session && req.session.user) {
        // Se o usuário estiver autenticado, permite o acesso à próxima rota
        next();
    } else {
        // Se o usuário não estiver autenticado, redireciona para a página de login
        res.redirect('/login');
    }
}