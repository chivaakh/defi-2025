/**
 * PDFGenerator.js
 * Génère le PDF "Plan d'action pour libérer ton école"
 * @author Chiva - Nuit de l'Info 2025
 * 
 * Installation requise: npm install jspdf
 */

// Import will be: import { jsPDF } from 'jspdf';
// For now, we'll structure it to work once jsPDF is installed

class PDFGenerator {
  constructor() {
    this.doc = null;
    this.pageWidth = 210; // A4 en mm
    this.pageHeight = 297;
    this.margin = 20;
    this.currentY = 20;
  }

  /**
   * Génère le PDF complet
   */
  async generatePDF(gameState, metrics, playerName = 'Agent NIRD') {
    try {
      // Dynamically import jsPDF (will work once installed)
      const { jsPDF } = await import('jspdf');
      this.doc = new jsPDF();
      
      this.currentY = this.margin;
      
      // Page 1: Couverture
      this.addCoverPage(playerName);
      
      // Page 2: Diagnostic
      this.doc.addPage();
      this.currentY = this.margin;
      this.addDiagnosticPage(gameState);
      
      // Page 3: Plan d'action
      this.doc.addPage();
      this.currentY = this.margin;
      this.addActionPlanPage(gameState, metrics);
      
      // Page 4: Ressources
      this.doc.addPage();
      this.currentY = this.margin;
      this.addResourcesPage();
      
      return this.doc;
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      // Fallback: génération HTML si jsPDF n'est pas disponible
      return this.generateHTMLFallback(gameState, metrics, playerName);
    }
  }

  /**
   * Page de couverture
   */
  addCoverPage(playerName) {
    const centerX = this.pageWidth / 2;
    
    // Titre principal
    this.doc.setFontSize(28);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 102, 204); // Bleu NIRD
    this.doc.text('Plan d\'Action NIRD', centerX, 60, { align: 'center' });
    
    // Sous-titre
    this.doc.setFontSize(16);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Pour libérer ton école', centerX, 75, { align: 'center' });
    
    // Encadré Agent
    this.doc.setFontSize(14);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(`Réalisé par : ${playerName}`, centerX, 100, { align: 'center' });
    
    // Date
    const today = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    this.doc.setFontSize(12);
    this.doc.setTextColor(150, 150, 150);
    this.doc.text(today, centerX, 110, { align: 'center' });
    
    // Logo/Slogan NIRD
    this.doc.setFontSize(18);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 170, 102); // Vert NIRD
    this.doc.text('Numérique Inclusif', centerX, 150, { align: 'center' });
    this.doc.text('Responsable & Durable', centerX, 165, { align: 'center' });
    
    // Citation
    this.doc.setFontSize(12);
    this.doc.setFont(undefined, 'italic');
    this.doc.setTextColor(100, 100, 100);
    const quote = '"Ton ordi n\'est pas vieux,\nil est juste prisonnier."';
    this.doc.text(quote, centerX, 200, { align: 'center' });
    
    // Footer
    this.doc.setFontSize(10);
    this.doc.setFont(undefined, 'normal');
    this.doc.text('Village Numérique Résistant', centerX, 270, { align: 'center' });
    this.doc.text('nird.forge.apps.education.fr', centerX, 280, { align: 'center' });
  }

  /**
   * Page de diagnostic
   */
  addDiagnosticPage(gameState) {
    this.doc.setFontSize(20);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 102, 204);
    this.doc.text('📊 Diagnostic de ton lycée', this.margin, this.currentY);
    this.currentY += 15;
    
    // Problèmes identifiés
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Problèmes identifiés:', this.margin, this.currentY);
    this.currentY += 10;
    
    const problems = [
      {
        icon: '💰',
        title: 'Licences coûteuses',
        found: gameState.level1Data.problemsFound.includes('licenses')
      },
      {
        icon: '🗑️',
        title: 'Obsolescence programmée',
        found: gameState.level1Data.problemsFound.includes('obsolescence')
      },
      {
        icon: '🔗',
        title: 'Dépendance technologique',
        found: gameState.level1Data.problemsFound.includes('dependance')
      },
      {
        icon: '🌍',
        title: 'Données hors UE',
        found: gameState.level1Data.problemsFound.includes('donnees')
      }
    ];
    
    this.doc.setFontSize(11);
    this.doc.setFont(undefined, 'normal');
    
    problems.forEach(problem => {
      const status = problem.found ? '✅' : '❌';
      this.doc.text(`${status} ${problem.icon} ${problem.title}`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });
    
    this.currentY += 10;
    
    // Score de résistance
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Score de Résistance Numérique:', this.margin, this.currentY);
    this.currentY += 10;
    
    this.doc.setFontSize(24);
    this.doc.setTextColor(0, 170, 102);
    this.doc.text(`${gameState.resistancePoints} / ${gameState.maxResistancePoints} points`, this.margin + 5, this.currentY);
    this.currentY += 15;
    
    // Progression par niveau
    this.doc.setFontSize(12);
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont(undefined, 'normal');
    
    const levelStats = [
      { name: 'Niveau 1 - Découvrir', completed: gameState.levelsCompleted.level1 },
      { name: 'Niveau 2 - Préparer', completed: gameState.levelsCompleted.level2 },
      { name: 'Niveau 3 - Convaincre', completed: gameState.levelsCompleted.level3 },
      { name: 'Niveau 4 - Libérer', completed: gameState.levelsCompleted.level4 }
    ];
    
    levelStats.forEach(level => {
      const status = level.completed ? '✅' : '⏳';
      this.doc.text(`${status} ${level.name}`, this.margin + 5, this.currentY);
      this.currentY += 7;
    });
  }

  /**
   * Page de plan d'action
   */
  addActionPlanPage(gameState, metrics) {
    this.doc.setFontSize(20);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 102, 204);
    this.doc.text('🎯 Ton Plan d\'Action', this.margin, this.currentY);
    this.currentY += 15;
    
    // Actions prioritaires
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Actions Prioritaires:', this.margin, this.currentY);
    this.currentY += 10;
    
    const actions = [
      {
        priority: 1,
        action: `Reconditionner ${gameState.level4Data.pcReconditioned} ordinateurs`,
        impact: `Économie: ${metrics.budget}€, CO2 évité: ${metrics.co2}kg`
      },
      {
        priority: 2,
        action: `Installer les logiciels libres`,
        impact: `${gameState.level4Data.softwaresInstalled.length} logiciels déployés`
      },
      {
        priority: 3,
        action: `Former l'équipe`,
        impact: `${gameState.level4Data.trainingsLaunched.length} formations planifiées`
      }
    ];
    
    this.doc.setFontSize(11);
    this.doc.setFont(undefined, 'normal');
    
    actions.forEach(({ priority, action, impact }) => {
      this.doc.setFont(undefined, 'bold');
      this.doc.text(`${priority}. ${action}`, this.margin + 5, this.currentY);
      this.currentY += 6;
      this.doc.setFont(undefined, 'italic');
      this.doc.setTextColor(100, 100, 100);
      this.doc.text(`→ ${impact}`, this.margin + 10, this.currentY);
      this.doc.setTextColor(0, 0, 0);
      this.currentY += 10;
    });
    
    this.currentY += 5;
    
    // Métriques d'impact
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Impact Prévu:', this.margin, this.currentY);
    this.currentY += 10;
    
    const impacts = [
      { icon: '💰', label: 'Économies annuelles', value: `${metrics.budget}€` },
      { icon: '🌱', label: 'CO2 évité', value: `${metrics.co2}kg` },
      { icon: '🔒', label: 'Sécurité', value: `${metrics.security}%` },
      { icon: '🎯', label: 'Autonomie', value: `${metrics.autonomy}%` }
    ];
    
    this.doc.setFontSize(11);
    this.doc.setFont(undefined, 'normal');
    
    impacts.forEach(({ icon, label, value }) => {
      this.doc.text(`${icon} ${label}: ${value}`, this.margin + 5, this.currentY);
      this.currentY += 8;
    });
    
    this.currentY += 10;
    
    // Timeline
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Timeline de Mise en Œuvre:', this.margin, this.currentY);
    this.currentY += 10;
    
    const timeline = [
      { phase: 'Mois 1-2', task: 'Audit et choix des solutions' },
      { phase: 'Mois 3-4', task: 'Reconditionnement des PC' },
      { phase: 'Mois 5-6', task: 'Installation et formation' },
      { phase: 'Mois 7+', task: 'Déploiement complet et support' }
    ];
    
    this.doc.setFontSize(10);
    this.doc.setFont(undefined, 'normal');
    
    timeline.forEach(({ phase, task }) => {
      this.doc.setFont(undefined, 'bold');
      this.doc.text(phase, this.margin + 5, this.currentY);
      this.doc.setFont(undefined, 'normal');
      this.doc.text(`: ${task}`, this.margin + 25, this.currentY);
      this.currentY += 7;
    });
  }

  /**
   * Page de ressources
   */
  addResourcesPage() {
    this.doc.setFontSize(20);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 102, 204);
    this.doc.text('📚 Ressources NIRD', this.margin, this.currentY);
    this.currentY += 15;
    
    // Sites web
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Sites Web:', this.margin, this.currentY);
    this.currentY += 10;
    
    const websites = [
      { name: 'Site officiel NIRD', url: 'nird.forge.apps.education.fr' },
      { name: 'Documentation Linux', url: 'doc.ubuntu-fr.org' },
      { name: 'Forge des Communs', url: 'forge.apps.education.fr' }
    ];
    
    this.doc.setFontSize(10);
    this.doc.setFont(undefined, 'normal');
    this.doc.setTextColor(0, 102, 204);
    
    websites.forEach(({ name, url }) => {
      this.doc.text(`• ${name}:`, this.margin + 5, this.currentY);
      this.currentY += 6;
      this.doc.text(`  ${url}`, this.margin + 10, this.currentY);
      this.currentY += 8;
    });
    
    this.currentY += 5;
    
    // Logiciels recommandés
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Logiciels Libres Recommandés:', this.margin, this.currentY);
    this.currentY += 10;
    
    const software = [
      { name: 'Ubuntu/Linux Mint', type: 'Système d\'exploitation' },
      { name: 'LibreOffice', type: 'Suite bureautique' },
      { name: 'Firefox', type: 'Navigateur web' },
      { name: 'Thunderbird', type: 'Client email' },
      { name: 'GIMP', type: 'Retouche d\'images' },
      { name: 'VLC', type: 'Lecteur multimédia' }
    ];
    
    this.doc.setFontSize(10);
    this.doc.setFont(undefined, 'normal');
    this.doc.setTextColor(0, 0, 0);
    
    software.forEach(({ name, type }) => {
      this.doc.setFont(undefined, 'bold');
      this.doc.text(`• ${name}`, this.margin + 5, this.currentY);
      this.doc.setFont(undefined, 'italic');
      this.doc.setTextColor(100, 100, 100);
      this.doc.text(`  (${type})`, this.margin + 8, this.currentY + 5);
      this.doc.setTextColor(0, 0, 0);
      this.currentY += 10;
    });
    
    this.currentY += 10;
    
    // Contact et support
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('Besoin d\'Aide?', this.margin, this.currentY);
    this.currentY += 10;
    
    this.doc.setFontSize(10);
    this.doc.setFont(undefined, 'normal');
    const helpText = [
      'La communauté NIRD est là pour t\'accompagner !',
      '',
      'Rejoins-nous sur :',
      '• Forum NIRD',
      '• Discord des établissements libres',
      '• Rencontres mensuelles en visio'
    ];
    
    helpText.forEach(line => {
      this.doc.text(line, this.margin + 5, this.currentY);
      this.currentY += 6;
    });
    
    // Message de fin
    this.currentY = 250;
    this.doc.setFontSize(12);
    this.doc.setFont(undefined, 'bold');
    this.doc.setTextColor(0, 170, 102);
    const centerX = this.pageWidth / 2;
    this.doc.text('🎉 Bienvenue dans la résistance numérique ! 🎉', centerX, this.currentY, { align: 'center' });
  }

  /**
   * Télécharge le PDF
   */
  download(filename = 'Plan_Action_NIRD.pdf') {
    if (this.doc) {
      this.doc.save(filename);
      return true;
    }
    return false;
  }

  /**
   * Obtient le PDF en blob
   */
  getBlob() {
    if (this.doc) {
      return this.doc.output('blob');
    }
    return null;
  }

  /**
   * Fallback HTML si jsPDF n'est pas disponible
   */
  generateHTMLFallback(gameState, metrics, playerName) {
    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Plan d'Action NIRD - ${playerName}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
          h1 { color: #0066CC; }
          h2 { color: #00AA66; margin-top: 30px; }
          .metric { background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; }
          .actions { list-style: none; padding: 0; }
          .actions li { padding: 10px; margin: 10px 0; background: #e8f4f8; border-left: 4px solid #0066CC; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <h1>🎯 Plan d'Action NIRD</h1>
        <p><strong>Réalisé par:</strong> ${playerName}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        
        <h2>📊 Diagnostic</h2>
        <div class="metric">
          <strong>Score de Résistance:</strong> ${gameState.resistancePoints}/${gameState.maxResistancePoints} points
        </div>
        
        <h2>🎯 Actions Prioritaires</h2>
        <ul class="actions">
          <li>Reconditionner ${gameState.level4Data.pcReconditioned} ordinateurs</li>
          <li>Installer ${gameState.level4Data.softwaresInstalled.length} logiciels libres</li>
          <li>Lancer ${gameState.level4Data.trainingsLaunched.length} formations</li>
        </ul>
        
        <h2>📈 Impact Prévu</h2>
        <div class="metric">💰 Économies: ${metrics.budget}€/an</div>
        <div class="metric">🌱 CO2 évité: ${metrics.co2}kg</div>
        <div class="metric">🔒 Sécurité: ${metrics.security}%</div>
        <div class="metric">🎯 Autonomie: ${metrics.autonomy}%</div>
        
        <h2>📚 Ressources</h2>
        <p>Site officiel: <a href="https://nird.forge.apps.education.fr">nird.forge.apps.education.fr</a></p>
        
        <p style="text-align: center; margin-top: 50px; color: #00AA66;">
          <strong>🎉 Bienvenue dans la résistance numérique ! 🎉</strong>
        </p>
      </body>
      </html>
    `;
    
    // Ouvre dans une nouvelle fenêtre pour impression
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    
    return { fallback: true, html };
  }
}

// Export singleton
const pdfGenerator = new PDFGenerator();

export default pdfGenerator;

// Export de la fonction principale pour utilisation facile
export const generateGamePDF = async (gameState, metrics, playerName) => {
  return await pdfGenerator.generatePDF(gameState, metrics, playerName);
};