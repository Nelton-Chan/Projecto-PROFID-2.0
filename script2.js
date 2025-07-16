
    // Script opcional para login usando Supabase
    const SUPABASE_URL = 'https://jpapcbiizvxwnyonzill.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYXBjYmlpenZ4d255b256aWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjU3MzgsImV4cCI6MjA2NzkwMTczOH0.GGfZA5sl13QLN7whlL_6WQ3VVPLSjOqT5w5NAbEF15c';
    const supabase = supabase.createClient(https://jpapcbiizvxwnyonzill.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYXBjYmlpenZ4d255b256aWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjU3MzgsImV4cCI6MjA2NzkwMTczOH0.GGfZA5sl13QLN7whlL_6WQ3VVPLSjOqT5w5NAbEF15c);

    async function loginUsuario(event) {
      event.preventDefault();

      const email = document.getElementById('login_email').value.trim();
      const password = document.getElementById('login_password').value;

      if (!email || !password) {
        document.getElementById('email-error').style.display = !email ? 'block' : 'none';
        document.getElementById('password-error').style.display = !password ? 'block' : 'none';
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert("Erro ao iniciar sessão: " + error.message);
      } else {
        alert("Login realizado com sucesso!");
        // Redirecionar ou carregar dados conforme necessário
        window.location.href = "menu.html";
      }
    }