import { type NextRequest, NextResponse } from "next/server"

// Mock payment processors
async function processCardPayment(cardDetails: any, amount: number, transactionId: string) {
  // Simulate card payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock validation
  if (cardDetails.number.length < 16) {
    return { success: false, message: "Numéro de carte invalide" }
  }

  return {
    success: true,
    message: "Paiement par carte réussi",
    providerTransactionId: `CARD_${transactionId}`,
  }
}

async function processMpesaPayment(phoneNumber: string, amount: number, transactionId: string) {
  // Simulate M-Pesa STK push
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    success: true,
    message: "Demande M-Pesa envoyée. Vérifiez votre téléphone pour confirmer le paiement.",
    providerTransactionId: `MPESA_${transactionId}`,
    instructions: "Entrez votre code PIN M-Pesa pour confirmer le paiement",
  }
}

async function processAirtelPayment(phoneNumber: string, amount: number, transactionId: string) {
  // Simulate Airtel Money processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    success: true,
    message: "Demande Airtel Money envoyée. Vérifiez votre téléphone pour confirmer le paiement.",
    providerTransactionId: `AIRTEL_${transactionId}`,
    instructions: "Entrez votre code PIN Airtel Money pour confirmer le paiement",
  }
}

async function processOrangePayment(phoneNumber: string, amount: number, transactionId: string) {
  // Simulate Orange Money processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    success: true,
    message: "Demande Orange Money envoyée. Vérifiez votre téléphone pour confirmer le paiement.",
    providerTransactionId: `ORANGE_${transactionId}`,
    instructions: "Entrez votre code PIN Orange Money pour confirmer le paiement",
  }
}

async function enrollUserInCourse(userId: string, courseId: string) {
  // Mock course enrollment
  console.log(`Enrolling user ${userId} in course ${courseId}`)
  // In real app: update database with enrollment
}

async function sendPaymentConfirmationEmail(email: string, transaction: any) {
  // Mock email sending
  console.log(`Sending confirmation email to ${email}`, transaction)
  // In real app: send actual email
}

export async function POST(request: NextRequest) {
  try {
    const { courseId, paymentMethod, amount, userDetails, phoneNumber, cardDetails } = await request.json()

    // Validate required fields
    if (!courseId || !paymentMethod || !amount || !userDetails) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // Validate payment method specific fields
    if (["mpesa", "airtel", "orange"].includes(paymentMethod) && !phoneNumber) {
      return NextResponse.json({ error: "Numéro de téléphone requis pour le paiement mobile" }, { status: 400 })
    }

    if (paymentMethod === "card" && (!cardDetails || !cardDetails.number || !cardDetails.cvv)) {
      return NextResponse.json({ error: "Détails de carte requis pour le paiement par carte" }, { status: 400 })
    }

    // Generate transaction ID
    const transactionId = `${paymentMethod.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Mock payment processing based on method
    let paymentResult
    switch (paymentMethod) {
      case "card":
        paymentResult = await processCardPayment(cardDetails, amount, transactionId)
        break
      case "mpesa":
        paymentResult = await processMpesaPayment(phoneNumber, amount, transactionId)
        break
      case "airtel":
        paymentResult = await processAirtelPayment(phoneNumber, amount, transactionId)
        break
      case "orange":
        paymentResult = await processOrangePayment(phoneNumber, amount, transactionId)
        break
      default:
        return NextResponse.json({ error: "Méthode de paiement non supportée" }, { status: 400 })
    }

    // Store transaction in database (mock)
    const transaction = {
      id: transactionId,
      courseId,
      userId: userDetails.userId,
      amount,
      paymentMethod,
      status: paymentResult.success ? "completed" : "failed",
      timestamp: new Date().toISOString(),
      details: paymentResult,
    }

    // In real app: save to database
    console.log("Transaction saved:", transaction)

    if (paymentResult.success) {
      // Enroll user in course
      await enrollUserInCourse(userDetails.userId, courseId)

      // Send confirmation email (mock)
      await sendPaymentConfirmationEmail(userDetails.email, transaction)
    }

    return NextResponse.json({
      success: paymentResult.success,
      transactionId,
      message: paymentResult.message,
      redirectUrl: paymentResult.success
        ? `/payment/success?courseId=${courseId}&transactionId=${transactionId}`
        : null,
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Erreur lors du traitement du paiement" }, { status: 500 })
  }
}
