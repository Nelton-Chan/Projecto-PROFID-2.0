    // Script  para registo conectado com Supabase
    const SUPABASE_URL = 'https://jpapcbiizvxwnyonzill.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYXBjYmlpenZ4d255b256aWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjU3MzgsImV4cCI6MjA2NzkwMTczOH0.GGfZA5sl13QLN7whlL_6WQ3VVPLSjOqT5w5NAbEF15c;
    const supabase = supabase.createClient(https://jpapcbiizvxwnyonzill.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYXBjYmlpenZ4d255b256aWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjU3MzgsImV4cCI6MjA2NzkwMTczOH0.GGfZA5sl13QLN7whlL_6WQ3VVPLSjOqT5w5NAbEF15c);


    function showForm(formType) {
      document.getElementById('formLogin').style.display = formType === 'login' ? 'block' : 'none';
      document.getElementById('formRecrutamento').style.display = formType === 'register' ? 'block' : 'none';
      document.querySelectorAll('.form-tab').forEach(tab => tab.classList.remove('active'));
      document.querySelector(`.form-tab[onclick="showForm('${formType}')"]`).classList.add('active');
    }

    function checkPasswordStrength(password) {
      const bar = document.getElementById('password-strength-bar');
      let strength = 0;
      if (password.length >= 6) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      if (strength <= 1) {
        bar.className = 'strength-bar strength-weak';
      } else if (strength === 2 || strength === 3) {
        bar.className = 'strength-bar strength-medium';
      } else {
        bar.className = 'strength-bar strength-strong';
      }
    }

    function mostrarNomeArquivo(input) {
      const nome = input.files[0] ? input.files[0].name : 'Nenhum arquivo selecionado';
      document.getElementById('nomeArquivo').textContent = nome;
    }

    async function enviarFormulario(event) {
      event.preventDefault();
      const form = document.getElementById('formRecrutamento');
      const formData = new FormData(form);
      const file = formData.get('curriculo');

      try {
        // Upload do currículo
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('curriculos').upload(fileName, file);
        if (uploadError) throw uploadError;

        // Inserção dos dados no banco
        const { error: insertError } = await supabase.from('recrutamento').insert({
          nome_completo: formData.get('nome_completo'),
          apelido: formData.get('nickname'),
          email: formData.get('email'),
          telefone: formData.get('telefone'),
          habilidades: formData.get('habilidades'),
          data_nascimento: formData.get('date_of_birth'),
          provincia: formData.get('provincia'),
          distrito: formData.get('distrito'),
          posto_administrativo: formData.get('posto_administrativo'),
          escola: formData.get('escola'),
          senha: formData.get('login_password'),
          curriculo_nome_arquivo: fileName
        });
        if (insertError) throw insertError;

        alert('Registro concluído com sucesso!');
// Limpa o formulário e os elementos visuais
form.reset();
document.getElementById('password-strength-bar').className = 'strength-bar';
document.getElementById('nomeArquivo').textContent = 'Nenhum arquivo selecionado';
// Redireciona para menu.html
window.location.href = 'menu.html';
      }
    }
// Certifique-se de que este script está linkado corretamente ao seu HTML

document.addEventListener('DOMContentLoaded', function () {
  const inputFile = document.getElementById('curriculo');
  const fileNameDisplay = document.getElementById('file-name');

  inputFile.addEventListener('change', function () {
    if (inputFile.files.length > 0) {
      fileNameDisplay.textContent = inputFile.files[0].name;
    } else {
      fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    }
  });
});
