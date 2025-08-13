import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, UserCheck, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Politique de confidentialité | E-Classroom",
  description:
    "Politique de confidentialité d'E-Classroom. Découvrez comment nous protégeons vos données personnelles sur notre plateforme d'éducation en ligne en RDC.",
  keywords:
    "politique confidentialité E-Classroom, protection données RDC, RGPD e-learning, sécurité données formation",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Politique de <span className="text-blue-600">Confidentialité</span>
          </h1>
          <p className="text-lg text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Eye className="h-6 w-6 text-blue-600 mr-3" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                E-Classroom s'engage à protéger la confidentialité et la sécurité de vos informations personnelles.
                Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons
                vos données lorsque vous utilisez notre plateforme d'éducation en ligne.
              </p>
              <p>
                En utilisant E-Classroom, vous acceptez les pratiques décrites dans cette politique. Si vous n'acceptez
                pas ces pratiques, veuillez ne pas utiliser notre service.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Database className="h-6 w-6 text-blue-600 mr-3" />
                Informations que nous collectons
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3>Informations que vous nous fournissez :</h3>
              <ul>
                <li>Nom, prénom, adresse e-mail et numéro de téléphone</li>
                <li>Informations de profil (photo, biographie, préférences)</li>
                <li>Informations de paiement (traitées de manière sécurisée)</li>
                <li>Communications avec notre équipe support</li>
                <li>Contenu que vous créez (commentaires, discussions, devoirs)</li>
              </ul>

              <h3>Informations collectées automatiquement :</h3>
              <ul>
                <li>Données d'utilisation (pages visitées, temps passé, interactions)</li>
                <li>Informations techniques (adresse IP, type de navigateur, système d'exploitation)</li>
                <li>Cookies et technologies similaires</li>
                <li>Progression dans les cours et résultats d'évaluation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <UserCheck className="h-6 w-6 text-blue-600 mr-3" />
                Comment nous utilisons vos informations
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Nous utilisons vos informations pour :</p>
              <ul>
                <li>Fournir et améliorer nos services éducatifs</li>
                <li>Personnaliser votre expérience d'apprentissage</li>
                <li>Traiter les paiements et gérer votre compte</li>
                <li>Communiquer avec vous (notifications, support, mises à jour)</li>
                <li>Analyser l'utilisation de la plateforme pour l'améliorer</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Respecter nos obligations légales</li>
                <li>Générer des certificats de formation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Mail className="h-6 w-6 text-blue-600 mr-3" />
                Partage de vos informations
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations dans les cas
                suivants :
              </p>
              <ul>
                <li>
                  <strong>Avec votre consentement :</strong> Lorsque vous nous autorisez explicitement
                </li>
                <li>
                  <strong>Prestataires de services :</strong> Partenaires qui nous aident à fournir nos services
                  (hébergement, paiement, analytics)
                </li>
                <li>
                  <strong>Formateurs :</strong> Informations nécessaires pour le suivi pédagogique (progression,
                  participation)
                </li>
                <li>
                  <strong>Obligations légales :</strong> Si requis par la loi ou pour protéger nos droits
                </li>
                <li>
                  <strong>Transfert d'entreprise :</strong> En cas de fusion, acquisition ou vente d'actifs
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Lock className="h-6 w-6 text-blue-600 mr-3" />
                Sécurité de vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos données
                :
              </p>
              <ul>
                <li>Chiffrement des données en transit et au repos</li>
                <li>Authentification à deux facteurs disponible</li>
                <li>Accès limité aux données sur la base du besoin de savoir</li>
                <li>Surveillance continue de la sécurité</li>
                <li>Sauvegardes régulières et sécurisées</li>
                <li>Formation du personnel sur la protection des données</li>
              </ul>
              <p>
                Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est 100% sécurisée.
                Nous nous efforçons d'utiliser des moyens commercialement acceptables pour protéger vos informations.
              </p>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Vous avez le droit de :</p>
              <ul>
                <li>
                  <strong>Accéder</strong> à vos données personnelles
                </li>
                <li>
                  <strong>Rectifier</strong> des informations inexactes
                </li>
                <li>
                  <strong>Supprimer</strong> vos données (droit à l'oubli)
                </li>
                <li>
                  <strong>Limiter</strong> le traitement de vos données
                </li>
                <li>
                  <strong>Portabilité</strong> de vos données
                </li>
                <li>
                  <strong>Opposition</strong> au traitement pour des raisons légitimes
                </li>
                <li>
                  <strong>Retirer votre consentement</strong> à tout moment
                </li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à : <strong>privacy@e-classroom.com</strong>
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">Cookies et technologies similaires</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Nous utilisons des cookies pour :</p>
              <ul>
                <li>Maintenir votre session de connexion</li>
                <li>Mémoriser vos préférences</li>
                <li>Analyser l'utilisation de la plateforme</li>
                <li>Améliorer la performance du site</li>
              </ul>
              <p>
                Vous pouvez contrôler les cookies via les paramètres de votre navigateur, mais cela peut affecter
                certaines fonctionnalités de la plateforme.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-lg border-0 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Pour toute question concernant cette politique de confidentialité, contactez-nous :
              </p>
              <div className="mt-4 space-y-2 text-blue-700">
                <p>
                  <strong>Email :</strong> privacy@e-classroom.com
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
