import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, CreditCard, Shield, AlertTriangle, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | E-Classroom",
  description:
    "Conditions d'utilisation d'E-Classroom. Consultez les termes et conditions de notre plateforme d'éducation en ligne en République Démocratique du Congo.",
  keywords: "conditions utilisation E-Classroom, termes service formation RDC, règles e-learning Congo",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Conditions <span className="text-blue-600">d'Utilisation</span>
          </h1>
          <p className="text-lg text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Scale className="h-6 w-6 text-blue-600 mr-3" />
                Acceptation des conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Bienvenue sur E-Classroom ! Ces conditions d'utilisation ("Conditions") régissent votre utilisation de
                notre plateforme d'éducation en ligne et de tous les services associés.
              </p>
              <p>
                En accédant à E-Classroom ou en l'utilisant, vous acceptez d'être lié par ces Conditions. Si vous
                n'acceptez pas ces Conditions, veuillez ne pas utiliser notre service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                Description du service
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>E-Classroom est une plateforme d'éducation en ligne qui propose :</p>
              <ul>
                <li>Des cours en ligne dans diverses disciplines</li>
                <li>Des formations professionnelles et masterclass</li>
                <li>Des certificats de completion</li>
                <li>Un forum communautaire</li>
                <li>Des outils d'apprentissage interactifs</li>
              </ul>
              <p>
                Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du service à tout
                moment, avec ou sans préavis.
              </p>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                Comptes utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Création de compte :</h3>
              <ul>
                <li>Vous devez fournir des informations exactes et complètes</li>
                <li>Vous êtes responsable de la confidentialité de votre mot de passe</li>
                <li>Un seul compte par personne est autorisé</li>
                <li>Vous devez avoir au moins 16 ans pour créer un compte</li>
              </ul>

              <h3>Responsabilités de l'utilisateur :</h3>
              <ul>
                <li>Maintenir la sécurité de votre compte</li>
                <li>Notifier immédiatement toute utilisation non autorisée</li>
                <li>Respecter les droits des autres utilisateurs</li>
                <li>Ne pas partager vos identifiants de connexion</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content and Conduct */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                Contenu et conduite
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Contenu autorisé :</h3>
              <ul>
                <li>Respectueux et constructif</li>
                <li>Pertinent au contexte éducatif</li>
                <li>Conforme aux lois en vigueur</li>
                <li>Original ou utilisé avec permission</li>
              </ul>

              <h3>Contenu interdit :</h3>
              <ul>
                <li>Contenu offensant, discriminatoire ou haineux</li>
                <li>Spam, publicité non autorisée</li>
                <li>Violation de droits d'auteur</li>
                <li>Informations fausses ou trompeuses</li>
                <li>Contenu pornographique ou inapproprié</li>
                <li>Menaces ou harcèlement</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payments and Refunds */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                Paiements et remboursements
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Paiements :</h3>
              <ul>
                <li>Les prix sont affichés en francs congolais (CDF) ou dollars américains (USD)</li>
                <li>Le paiement est requis avant l'accès aux cours payants</li>
                <li>Nous acceptons les cartes bancaires, M-Pesa, Airtel Money et Orange Money</li>
                <li>Tous les paiements sont sécurisés et chiffrés</li>
              </ul>

              <h3>Politique de remboursement :</h3>
              <ul>
                <li>Remboursement possible dans les 7 jours suivant l'achat</li>
                <li>Conditions : moins de 20% du cours complété</li>
                <li>Les certificats déjà émis annulent le droit au remboursement</li>
                <li>Remboursement traité sous 5-10 jours ouvrables</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Contenu E-Classroom :</h3>
              <p>
                Tous les contenus de la plateforme (cours, vidéos, textes, logos, design) sont protégés par les droits
                d'auteur et appartiennent à E-Classroom ou à nos partenaires.
              </p>

              <h3>Votre contenu :</h3>
              <p>
                Vous conservez vos droits sur le contenu que vous créez, mais vous nous accordez une licence pour
                l'utiliser dans le cadre de nos services.
              </p>

              <h3>Utilisation autorisée :</h3>
              <ul>
                <li>Usage personnel et éducatif uniquement</li>
                <li>Pas de redistribution ou revente</li>
                <li>Pas de modification sans autorisation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <AlertTriangle className="h-6 w-6 text-blue-600 mr-3" />
                Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>E-Classroom s'efforce de fournir un service de qualité, mais nous ne pouvons garantir :</p>
              <ul>
                <li>La disponibilité continue du service</li>
                <li>L'absence d'erreurs ou de bugs</li>
                <li>L'obtention de résultats spécifiques</li>
                <li>La compatibilité avec tous les appareils</li>
              </ul>
              <p>
                Notre responsabilité est limitée au montant payé pour le service concerné. Nous ne sommes pas
                responsables des dommages indirects ou consécutifs.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">Résiliation</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Par vous :</h3>
              <p>Vous pouvez fermer votre compte à tout moment via les paramètres de votre profil.</p>

              <h3>Par nous :</h3>
              <p>Nous pouvons suspendre ou fermer votre compte en cas de :</p>
              <ul>
                <li>Violation de ces conditions</li>
                <li>Activité frauduleuse ou illégale</li>
                <li>Non-paiement des frais dus</li>
                <li>Inactivité prolongée (plus de 2 ans)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">Droit applicable</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Ces conditions sont régies par les lois de la République Démocratique du Congo. Tout litige sera soumis
                à la juridiction des tribunaux de Kinshasa.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-lg border-0 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">Pour toute question concernant ces conditions d'utilisation :</p>
              <div className="mt-4 space-y-2 text-blue-700">
                <p>
                  <strong>Email :</strong> legal@e-classroom.com
                </p>
                <p>
                  <strong>Adresse :</strong> Avenue de la Paix, Kinshasa, RDC
                </p>
                <p>
                  <strong>Téléphone :</strong> +243 XXX XXX XXX
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
