import React from 'react';
import style from './errorboundary.module.css';

/*
 * Captura exceções de render dos componentes dinâmicos (ai_components).
 * O YAIL vem de fora do app, então um bloco inesperado não pode derrubar
 * a página inteira — mostramos um aviso dentro da tela do celular.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[LIDEA-w] Erro ao renderizar componentes:', error, info);
    }
  }

  componentDidUpdate(prevProps) {
    // Novo YAIL chegou — tenta renderizar de novo
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.container}>
          <span className={style.icon}>!</span>
          <p className={style.title}>Não foi possível renderizar o aplicativo</p>
          <p className={style.text}>
            Um componente recebido do App Inventor gerou um erro. A tela será
            atualizada automaticamente quando um novo código for recebido.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
