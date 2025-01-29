import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- interfaces/Taxas.ts ---
type Taxas = {
  [key: string]: number;
};

// --- services/CalculoRendimentoService.ts ---
class CalculoRendimentoService {
  calcularRendimento(capital: number, taxaMensal: number): number {
    return capital * taxaMensal;
  }

  validarCapital(capital: string): number | null {
    const capitalFloat = parseFloat(capital);
    if (isNaN(capitalFloat)) {
      alert('Por favor, insira um valor numérico para o capital.');
      return null;
    }
    return capitalFloat; // Return the validated capital if it's a number
  }

  validarTaxaMensal(banco: string, taxas: Taxas): number | null {
    const taxaMensal = taxas[banco];
    if (!taxaMensal) {
      alert('Taxa de rendimento não encontrada para o banco selecionado.');
      return null;
    }
    return taxaMensal; // Return the taxaMensal if found
  }
}

// --- utils/formatacao.ts ---
function formatarResultado(rendimento: number): string {
  return rendimento.toFixed(2);
}

// --- styles/sharedStyles.ts ---
import { CSSProperties } from 'react';

const sharedStyles: { [key: string]: CSSProperties } = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
};

// --- components/CalculadoraCDI.js ---
function CalculadoraCDI() {
  const [capital, setCapital] = useState('');
  const [banco, setBanco] = useState('nubank');
  const [rendimento, setRendimento] = useState<string | null>(null);

  const taxas: Taxas = {
    nubank: 0.009,
    itau: 0.0085,
    // Adicione outros bancos aqui
  };

  const calculoRendimentoService = new CalculoRendimentoService();

  const handleCalcularRendimento = (e: React.FormEvent) => {
    e.preventDefault();

    const capitalValidado = calculoRendimentoService.validarCapital(capital);
    if (capitalValidado === null) return;

    const taxaMensalValidada = calculoRendimentoService.validarTaxaMensal(
      banco,
      taxas
    );
    if (taxaMensalValidada === null) return;

    const rendimentoCalculado = calculoRendimentoService.calcularRendimento(
      capitalValidado,
      taxaMensalValidada
    );
    const resultadoFormatado = formatarResultado(rendimentoCalculado);
    setRendimento(resultadoFormatado);
  };

  return (
    <div
      data-item-scope
      data-item-type="http://schema.org/FinancialService"
      style={sharedStyles['container']}
    >
      <h1 itemProp="name" style={{ marginBottom: '20px' }}>
        {' '}
        Calculadora de Rendimento CDI{' '}
      </h1>

      <div style={{ marginBottom: '15px', width: '250px' }}>
        <label htmlFor="capital" style={sharedStyles['label']}>
          {' '}
          Capital:{' '}
        </label>
        <input
          type="number"
          id="capital"
          name="capital"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          itemProp="amount"
          style={sharedStyles['input']}
        />
      </div>

      <div style={{ marginBottom: '15px', width: '250px' }}>
        <label htmlFor="banco" style={sharedStyles['label']}>
          {' '}
          Banco:{' '}
        </label>
        <select
          id="banco"
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          itemProp="provider"
          style={sharedStyles['input']}
        >
          <option value="nubank"> Nubank </option>
          <option value="itau"> Itaú </option>
          {/* Adicione outros bancos aqui */}
        </select>
      </div>

      <button onClick={handleCalcularRendimento} style={sharedStyles['button']}>
        Calcular
      </button>

      {rendimento !== null && (
        <div
          id="resultado"
          itemProp="result"
          style={{ marginTop: '20px', fontWeight: 'bold' }}
        >
          Rendimento: R$ {rendimento}
        </div>
      )}
    </div>
  );
}

const container = document.getElementById('root') as HTMLElement | null;
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(<CalculadoraCDI />);
