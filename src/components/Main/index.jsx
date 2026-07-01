import React, { useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import ElementsContainer from '../ElementsContainer';
import ErrorBoundary from '../ErrorBoundary';
import ScreenTitle from '../ai_components/ScreenTitle';
import style from './main.module.css';

export default function Main({ onOpenModal }) {
  const { isConnected, phoneLoading, components, screenName, reset } = useContext(ContentContext);

  if (!isConnected) {
    return (
      <main className={style.main}>
        <div className={style.welcome}>
          <div className={style['welcome-header']}>
            <h1 className={style['welcome-title']}>Bem-vindo ao LIDEA-w</h1>
            <p className={style['welcome-sub']}>
              Visualize e interaja com seus apps do MIT App Inventor diretamente no navegador — sem dispositivo Android.
            </p>
          </div>

          <div className={style.steps}>
            <div className={style.card}>
              <div className={style.badge}>1</div>
              <p className={style['step-title']}>Conecte no App Inventor</p>
              <p className={style['step-desc']}>Em <b>Connect → AI2 Companion</b>, copie o código de 6 caracteres.</p>
            </div>
            <div className={style.card}>
              <div className={style.badge}>2</div>
              <p className={style['step-title']}>Inicie a sessão</p>
              <p className={style['step-desc']}>Clique em <b>Iniciar Sessão</b> e informe o código no campo.</p>
            </div>
            <div className={style.card}>
              <div className={style.badge}>3</div>
              <p className={style['step-title']}>Visualize em tempo real</p>
              <p className={style['step-desc']}>Seu app aparece no celular virtual, atualizado automaticamente.</p>
            </div>
          </div>

          <button className={style['cta-btn']} onClick={onOpenModal}>Iniciar Sessão</button>
        </div>
      </main>
    );
  }

  return (
    <main className={style.main}>
      <div className={style['connected-layout']}>
        <div className={style['phone-frame']}>
          <div className={style['phone-camera']}>
            <span className={style['camera-dot']} />
            <span className={style['camera-bar']} />
          </div>
          <div className={style['phone-screen']}>
            <ScreenTitle />
            <div className={style['app-content']}>
              {phoneLoading && components.length === 0 ? (
                <div className={style['loading-state']}>
                  <div className={style.spinner} />
                  <span className={style['loading-text']}>Carregando aplicativo…</span>
                </div>
              ) : (
                <ErrorBoundary resetKey={components}>
                  <ElementsContainer />
                </ErrorBoundary>
              )}
            </div>
          </div>
          <div className={style['phone-home']} />
        </div>

        <aside className={style['status-panel']}>
          <div className={style['session-card']}>
            <div className={style['card-header']}>
              <span className={style['card-title']}>Sessão</span>
              <div className={style['online-pill']}>
                <span className={style['online-dot']} />
                <span className={style['online-text']}>Online</span>
              </div>
            </div>
            <div className={style['info-rows']}>
              <div className={style['info-row']}>
                <span className={style['info-label']}>APLICATIVO</span>
                <span className={style['info-value']}>{screenName || '—'}</span>
              </div>
              <div className={style['info-row']}>
                <span className={style['info-label']}>ATUALIZAÇÃO</span>
                <span className={style['info-value-muted']}>a cada 2s</span>
              </div>
            </div>
          </div>

          <button className={style['end-btn']} onClick={reset}>Encerrar sessão</button>

          <p className={style['panel-note']}>
            O conteúdo da tela é controlado pelo App Inventor e renderizado dentro do dispositivo virtual.
          </p>
        </aside>
      </div>
    </main>
  );
}
