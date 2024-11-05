// النص البرمجي الأساسي
        const cube = document.querySelector('.cube');
        const gameContainer = document.getElementById('gameContainer');
        const gameContent = document.getElementById('gameContent');
        const gameControls = document.getElementById('gameControls');

        let isRotating = true;
        let currentRotation = 0;

        // متابعة النص البرمجي الأساسي...

// دوران المكعب التلقائي
function autoRotate() {
    if (isRotating) {
        currentRotation += 90;
        cube.style.transform = `rotateY(${currentRotation}deg)`;
    }
}

setInterval(autoRotate, 3000);

// وظيفة إيقاف الدوران عند التحويم
cube.addEventListener('mouseover', () => {
    isRotating = false;
});

cube.addEventListener('mouseleave', () => {
    isRotating = true;
});

// معالجة النقر على الألعاب
document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', () => {
        const game = face.dataset.game;
        loadGame(game);
        isRotating = false;
    });
});

// وظيفة تحميل اللعبة
function loadGame(gameName) {
    gameContainer.style.display = 'block';
    cube.style.display = 'none';
    
    // تنظيف المحتوى السابق
    gameContent.innerHTML = '';
    gameControls.innerHTML = '';
    
    switch(gameName) {
        case 'baloot':
            setupBalootGame();
            break;
        case 'hand':
            setupHandGame();
            break;
        case 'chess':
            setupChessGame();
            break;
        case 'domino':
            setupDominoGame();
            break;
    }
}

// وظيفة العودة للقائمة الرئيسية
function returnToMenu() {
    gameContainer.style.display = 'none';
    cube.style.display = 'block';
    isRotating = true;
}

// إعداد لعبة البلوت
function setupBalootGame() {
    const balootTable = document.createElement('div');
    balootTable.className = 'game-table baloot-table';
    
    // إضافة اللاعبين
    const playerPositions = [
        { top: '10%', left: '50%', transform: 'translate(-50%, 0)' },
        { top: '50%', right: '10%', transform: 'translate(0, -50%)' },
        { top: '90%', left: '50%', transform: 'translate(-50%, -100%)' },
        { top: '50%', left: '10%', transform: 'translate(0, -50%)' }
    ];

    playerPositions.forEach((pos, index) => {
        const player = document.createElement('div');
        player.className = 'baloot-player';
        player.innerHTML = `<i class="fas fa-user"></i><div>لاعب ${index + 1}</div>`;
        Object.assign(player.style, pos);
        balootTable.appendChild(player);
    });

    gameContent.appendChild(balootTable);
    setupGameControls(['توزيع', 'حكم', 'إعادة']);
}

// إعداد لعبة الهاند
function setupHandGame() {
    const handTable = document.createElement('div');
    handTable.className = 'game-table hand-table';
    
    // إضافة مناطق اللعب
    const playerPositions = [
        { top: '5%', left: '50%', transform: 'translate(-50%, 0) rotate(180deg)' },
        { top: '50%', left: '5%', transform: 'translate(0, -50%) rotate(90deg)' },
        { top: '95%', left: '50%', transform: 'translate(-50%, -100%)' },
        { top: '50%', right: '5%', transform: 'translate(0, -50%) rotate(-90deg)' }
    ];

    playerPositions.forEach((pos, index) => {
        const player = document.createElement('div');
        player.className = 'hand-player';
        Object.assign(player.style, pos);
        handTable.appendChild(player);
    });

    gameContent.appendChild(handTable);
    setupGameControls(['توزيع', 'جمع', 'إعادة']);
}

// إعداد لعبة الشطرنج
function setupChessGame() {
    const chessBoard = document.createElement('div');
    chessBoard.className = 'game-table chess-board';
    
    // إنشاء رقعة الشطرنج
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.className = 'chess-cell';
        cell.style.background = (Math.floor(i / 8) + i % 8) % 2 === 0 ? '#fff' : '#000';
        chessBoard.appendChild(cell);
    }

    gameContent.appendChild(chessBoard);
    setupGameControls(['تحريك', 'تراجع', 'إعادة']);
}

// إعداد لعبة الدومينو
function setupDominoGame() {
    const dominoTable = document.createElement('div');
    dominoTable.className = 'game-table domino-table';
    
    // إضافة قطع الدومينو
    for (let i = 0; i < 7; i++) {
        const piece = document.createElement('div');
        piece.className = 'domino-piece';
        piece.style.animation = `pieceDrop 0.5s ${i * 0.1}s ease-out forwards`;
        dominoTable.appendChild(piece);
    }

    gameContent.appendChild(dominoTable);
    setupGameControls(['توزيع', 'سحب', 'إعادة']);
}

// إعداد أزرار التحكم
function setupGameControls(actions) {
    actions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'control-btn';
        button.textContent = action;
        button.onclick = () => handleGameAction(action);
        gameControls.appendChild(button);
    });
}

// معالجة إجراءات اللعبة
function handleGameAction(action) {
    switch(action) {
        case 'توزيع':
            animateDealing();
            break;
        case 'جمع':
            animateCollection();
            break;
        case 'إعادة':
            resetCurrentGame();
            break;
        case 'تحريك':
            enablePieceMovement();
            break;
        case 'تراجع':
            undoLastMove();
            break;
        case 'سحب':
            drawNewPiece();
            break;
    }
}

// وظائف الرسوم المتحركة
function animateDealing() {
    const players = document.querySelectorAll('.baloot-player, .hand-player');
    players.forEach((player, index) => {
        player.style.animation = `cardDeal 0.5s ${index * 0.2}s ease-out forwards`;
    });
}

function animateCollection() {
    const pieces = document.querySelectorAll('.domino-piece');
    pieces.forEach((piece, index) => {
        piece.style.animation = `pieceDrop 0.5s ${index * 0.1}s ease-out reverse`;
    });
}

// وظائف إضافية للتفاعل
function enablePieceMovement() {
    const pieces = document.querySelectorAll('.chess-cell');
    pieces.forEach(piece => {
        piece.style.cursor = 'pointer';
        piece.onclick = () => piece.style.animation = 'playerTurn 1s infinite';
    });
}

function undoLastMove() {
    // منطق التراجع عن الحركة الأخيرة
    console.log('Undoing last move...');
}

function drawNewPiece() {
    const newPiece = document.createElement('div');
    newPiece.className = 'domino-piece';
    newPiece.style.animation = 'pieceDrop 0.5s ease-out forwards';
    document.querySelector('.domino-table').appendChild(newPiece);
}

function resetCurrentGame() {
    const currentGame = gameContent.firstChild;
    if (currentGame) {
        currentGame.remove();
        loadGame(currentGame.className.split(' ')[1].replace('-table', ''));
    }
}

// إضافة استجابة للنوافذ المتغيرة
window.addEventListener('resize', () => {
    if (gameContainer.style.display === 'block') {
        adjustGameLayout();
    }
});

function adjustGameLayout() {
    const table = gameContent.firstChild;
    if (table) {
        const containerWidth = gameContent.offsetWidth;
        const containerHeight = gameContent.offsetHeight;
        table.style.width = Math.min(containerWidth, containerHeight * 1.5) + 'px';
        table.style.height = Math.min(containerHeight, containerWidth * 0.67) + 'px';
    }
}
// إضافة متغيرات عامة للتتبع
let currentGame = null;
let gameState = {
    currentPlayer: 0,
    scores: [0, 0, 0, 0],
    moves: [],
    pieces: []
};

// تحسين إدارة الحالة
function initializeGameState() {
    gameState = {
        currentPlayer: 0,
        scores: [0, 0, 0, 0],
        moves: [],
        pieces: []
    };
    updateScoreDisplay();
}

// إضافة لوحة النتائج
function createScoreBoard() {
    const scoreBoard = document.createElement('div');
    scoreBoard.className = 'score-board';
    scoreBoard.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border-radius: 10px;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    const scores = document.createElement('div');
    scores.id = 'playerScores';
    scoreBoard.appendChild(scores);
    
    document.body.appendChild(scoreBoard);
    updateScoreDisplay();
}

// تحديث عرض النتائج
function updateScoreDisplay() {
    const scoresDiv = document.getElementById('playerScores');
    if (scoresDiv) {
        scoresDiv.innerHTML = gameState.scores.map((score, index) => 
            `<div class="player-score">
                <span>لاعب ${index + 1}:</span>
                <span>${score}</span>
             </div>`
        ).join('');
    }
}

// تحسين تفاعلات البلوت
function enhanceBalootGame() {
    const players = document.querySelectorAll('.baloot-player');
    players.forEach((player, index) => {
        player.onclick = () => {
            if (gameState.currentPlayer === index) {
                player.style.animation = 'playerTurn 1s';
                playCard(index);
            }
        };
    });
    
    // إضافة منطقة اللعب المركزية
    const playArea = document.createElement('div');
    playArea.className = 'play-area';
    playArea.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    document.querySelector('.baloot-table').appendChild(playArea);
}

// تحسين تفاعلات الهاند
function enhanceHandGame() {
    const cards = [];
    for (let i = 0; i < 13; i++) {
        const card = document.createElement('div');
        card.className = 'hand-card';
        card.style.cssText = `
            position: absolute;
            width: 60px;
            height: 90px;
            background: white;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.3s;
        `;
        card.onclick = () => playHandCard(i);
        cards.push(card);
    }
    
    // توزيع البطاقات بشكل مروحي
    cards.forEach((card, i) => {
        const angle = (i - 6) * 5;
        card.style.transform = `rotate(${angle}deg) translateY(-50px)`;
    });
}

// تحسين تفاعلات الشطرنج
function enhanceChessGame() {
    const cells = document.querySelectorAll('.chess-cell');
    let selectedCell = null;
    
    cells.forEach((cell, index) => {
        cell.onclick = () => {
            if (selectedCell) {
                // منطق تحريك القطعة
                movePiece(selectedCell, index);
                selectedCell.classList.remove('selected');
                selectedCell = null;
            } else {
                cell.classList.add('selected');
                selectedCell = cell;
            }
        };
    });
}

// تحسين تفاعلات الدومينو
function enhanceDominoGame() {
    const dominoPieces = document.querySelectorAll('.domino-piece');
    let selectedPiece = null;
    
    dominoPieces.forEach((piece, index) => {
        piece.onclick = () => {
            if (selectedPiece) {
                // منطق وضع القطعة
                placeDominoPiece(selectedPiece, piece);
                selectedPiece.classList.remove('selected');
                selectedPiece = null;
            } else {
                piece.classList.add('selected');
                selectedPiece = piece;
            }
        };
    });
}

// إضافة تأثيرات صوتية
function addSoundEffects() {
    const sounds = {
        deal: new Audio('deal.mp3'),
        move: new Audio('move.mp3'),
        win: new Audio('win.mp3'),
        error: new Audio('error.mp3')
    };
    
    return {
        playDeal: () => sounds.deal.play(),
        playMove: () => sounds.move.play(),
        playWin: () => sounds.win.play(),
        playError: () => sounds.error.play()
    };
}

// تحسين تجربة المستخدم
function enhanceUserExperience() {
    // إضافة تلميحات
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
        border-radius: 4px;
        display: none;
        z-index: 1000;
    `;
    document.body.appendChild(tooltip);
    
    // إضافة التلميحات للأزرار
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.onmouseover = (e) => {
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.top = (e.pageY - 30) + 'px';
            tooltip.textContent = getButtonTooltip(btn.textContent);
        };
        btn.onmouseout = () => {
            tooltip.style.display = 'none';
        };
    });
}

// الحصول على نص التلميح
function getButtonTooltip(action) {
    const tooltips = {
        'توزيع': 'توزيع الأوراق على اللاعبين',
        'حكم': 'طلب حكم للعبة',
        'إعادة': 'إعادة تشغيل اللعبة',
        'تحريك': 'تحريك قطعة مختارة',
        'تراجع': 'التراجع عن الحركة الأخيرة',
        'سحب': 'سحب قطعة جديدة'
    };
    return tooltips[action] || action;
}

// إضافة رسائل النظام
function showSystemMessage(message, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.className = `system-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        border-radius: 5px;
        background: ${type === 'error' ? '#ff4444' : '#44ff44'};
        color: white;
        z-index: 1000;
        animation: fadeInOut 3s forwards;
    `;
    
    document.body.appendChild(messageElement);
    setTimeout(() => messageElement.remove(), 3000);
}

// تحسين أداء التطبيق
function optimizePerformance() {
    // استخدام RequestAnimationFrame للرسوم المتحركة
    let animationFrameId;
    
    function animate() {
        // تحديث الرسوم المتحركة
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // بدء الرسوم المتحركة
    animate();
    
    // تنظيف عند مغادرة اللعبة
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
}

// تحسين التوافق مع الأجهزة المحمولة
function enhanceMobileSupport() {
    // إضافة دعم اللمس
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // تنفيذ الإجراء المناسب بناءً على اتجاه السحب
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // سحب أفقي
            if (deltaX > 0) {
                // سحب لليمين
            } else {
                // سحب لليسار
            }
        } else {
            // سحب رأسي
            if (deltaY > 0) {
                // سحب للأسفل
            } else {
                // سحب للأعلى
            }
        }
    });
}

// تهيئة التطبيق
function initializeApp() {
    createScoreBoard();
    enhanceUserExperience();
    const cleanup = optimizePerformance();
    enhanceMobileSupport();
    
    // تنظيف عند إغلاق التطبيق
    window.addEventListener('unload', cleanup);
}

// بدء تشغيل التطبيق
initializeApp();

/* الأنماط النهائية للتطبيق */

/* تحسينات الرسوم المتحركة */
@keyframes fadeInGame {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes glowEffect {
    0% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 204, 0, 0.8); }
    100% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.5); }
}

@keyframes winCelebration {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

/* تحسينات لوحة النتائج */
.score-board {
    animation: slideIn 0.5s ease-out;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.player-score {
    padding: 8px 15px;
    margin: 5px 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

/* تحسينات رسائل النظام */
.system-message {
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* تحسينات التلميحات */
.tooltip {
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* تحسينات الإضاءة للعناصر النشطة */
.active-player {
    animation: glowEffect 2s infinite;
}

/* تحسينات حالة الفوز */
.winner-celebration {
    animation: winCelebration 1s ease-in-out;
}

/* تحسينات التوافقية */
@media (max-width: 480px) {
    .game-controls {
        padding: 10px;
    }
    
    .control-btn {
        font-size: 14px;
        padding: 8px 15px;
    }
    
    .score-board {
        font-size: 14px;
    }
}

/* تحسينات الأداء */
* {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}
// تهيئة نهائية للتطبيق
document.addEventListener('DOMContentLoaded', () => {
    // تهيئة الواجهة
    initializeApp();
    
    // إضافة شاشة الترحيب
    showWelcomeScreen();
    
    // إضافة المساعدة
    addHelpButton();
});

// إظهار شاشة الترحيب
function showWelcomeScreen() {
    const welcome = document.createElement('div');
    welcome.className = 'welcome-screen';
    welcome.innerHTML = `
        <div class="welcome-content">
            <h1>مرحباً بك في بوابة الألعاب العربية</h1>
            <p>اختر لعبتك المفضلة وابدأ المتعة!</p>
            <button onclick="closeWelcome()" class="start-btn">ابدأ اللعب</button>
        </div>
    `;
    document.body.appendChild(welcome);
}

// إغلاق شاشة الترحيب
function closeWelcome() {
    document.querySelector('.welcome-screen').style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
        document.querySelector('.welcome-screen').remove();
    }, 500);
}

// إضافة زر المساعدة
function addHelpButton() {
    const helpBtn = document.createElement('button');
    helpBtn.className = 'help-btn';
    helpBtn.innerHTML = '<i class="fas fa-question-circle"></i>';
    helpBtn.onclick = showInstructions;
    document.body.appendChild(helpBtn);
}

// إظهار التعليمات
function showInstructions() {
    const instructions = {
        'البلوت': [
            'اضغط على "توزيع" لبدء جولة جديدة',
            'انقر على البطاقات لعرضها',
            'اتبع قواعد لعبة البلوت التقليدية'
        ],
        'الهاند': [
            'وزع 13 ورقة لكل لاعب',
            'انقر على الورقة التي تريد لعبها',
            'اجمع النقاط وفقاً لقواعد اللعبة'
        ],
        'الشطرنج': [
            'انقر على القطعة التي تريد تحريكها',
            'انقر على الموقع الجديد للقطعة',
            'اتبع قواعد الشطرنج القياسية'
        ],
        'الدومينو': [
            'اسحب قطعة جديدة من المجموعة',
            'ضع القطع المتطابقة بجانب بعضها',
            'اجمع النقاط عند إكمال السلسلة'
        ]
    };

    const modal = document.createElement('div');
    modal.className = 'instructions-modal';
    modal.innerHTML = `
        <div class="instructions-content">
            <h2>تعليمات اللعب</h2>
            ${Object.entries(instructions).map(([game, steps]) => `
                <div class="game-instructions">
                    <h3>${game}</h3>
                    <ul>
                        ${steps.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            <button onclick="closeInstructions()" class="close-btn">فهمت</button>
        </div>
    `;
document.body.appendChild(modal);
}

// إغلاق التعليمات
function closeInstructions() {
    const modal = document.querySelector('.instructions-modal');
    modal.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => modal.remove(), 300);
}

// إدارة الأخطاء
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo);
    showSystemMessage('عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.', 'error');
    return false;
};

// تحسين الأداء
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // إيقاف مؤقت للرسوم المتحركة والعمليات غير الضرورية
        pauseGame();
    } else {
        // استئناف اللعب
        resumeGame();
    }
});

// الحفظ التلقائي
function autoSave() {
    const gameData = {
        currentGame,
        gameState,
        scores: gameState.scores
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// استعادة البيانات المحفوظة
function loadSavedGame() {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
        const data = JSON.parse(savedData);
        currentGame = data.currentGame;
        gameState = data.gameState;
        updateScoreDisplay();
        return true;
    }
    return false;
}

// تنظيف عند الخروج
window.addEventListener('beforeunload', () => {
    autoSave();
});
