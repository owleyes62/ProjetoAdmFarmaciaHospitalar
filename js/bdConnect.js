// Connectando ao Banco de dados

if (!window.supabaseClient) {
  const supabaseUrl = 'https://dlvnqicokbjwdayyyxgg.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdm5xaWNva2Jqd2RheXl5eGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTA4MDIsImV4cCI6MjA2MzI2NjgwMn0.zuLMwmivpFrIAodXzMwh-2D_fLqel83QJ_GCIx8bjlk';

  window.supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

  async function testarConexao() {
    try {
      const { data, error } = await window.supabaseClient.from('paciente').select('*').limit(1);
      if (error) throw error;
      console.log('Conectado ao Supabase!'); 
    } catch (err) {
      console.error('Erro ao conectar:', err.message);
    }
  }
}