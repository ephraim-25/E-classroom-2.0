import { type NextRequest, NextResponse } from "next/server"

// POST /api/payments/refund - Process refund request
export async function POST(request: NextRequest) {
  try {
    const { transactionId, reason } = await request.json()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    if (!token.startsWith("token_")) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const [, tokenUserId, userType] = token.split("_")

    // Only admin can process refunds
    if (userType !== "admin") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Find transaction
    const transaction = await findTransaction(transactionId)
    if (!transaction) {
      return NextResponse.json({ error: "Transaction non trouvée" }, { status: 404 })
    }

    if (transaction.status !== "completed") {
      return NextResponse.json(
        { error: "Seules les transactions complétées peuvent être remboursées" },
        { status: 400 },
      )
    }

    // Process refund based on payment method
    let refundResult
    switch (transaction.paymentMethod) {
      case "card":
        refundResult = await processCardRefund(transaction)
        break
      case "mpesa":
        refundResult = await processMpesaRefund(transaction)
        break
      case "airtel":
        refundResult = await processAirtelRefund(transaction)
        break
      case "orange":
        refundResult = await processOrangeRefund(transaction)
        break
      default:
        return NextResponse.json({ error: "Méthode de paiement non supportée pour le remboursement" }, { status: 400 })
    }

    // Create refund record
    const refund = {
      id: `REFUND_${Date.now()}`,
      transactionId,
      amount: transaction.amount,
      reason,
      status: refundResult.success ? "completed" : "failed",
      processedBy: tokenUserId,
      timestamp: new Date().toISOString(),
      providerRefundId: refundResult.refundId,
    }

    // Save refund record (mock)
    console.log("Refund processed:", refund)

    return NextResponse.json({
      success: refundResult.success,
      refund,
      message: refundResult.message,
    })
  } catch (error) {
    console.error("Refund processing error:", error)
    return NextResponse.json({ error: "Erreur lors du traitement du remboursement" }, { status: 500 })
  }
}

async function findTransaction(transactionId: string) {
  // Mock transaction lookup
  return {
    id: transactionId,
    amount: 79,
    paymentMethod: "card",
    status: "completed",
    userId: "1",
  }
}

async function processCardRefund(transaction: any) {
  // Mock card refund processing
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    message: "Remboursement par carte traité avec succès",
    refundId: `CARD_REFUND_${Date.now()}`,
  }
}

async function processMpesaRefund(transaction: any) {
  // Mock M-Pesa refund processing
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    message: "Remboursement M-Pesa traité avec succès",
    refundId: `MPESA_REFUND_${Date.now()}`,
  }
}

async function processAirtelRefund(transaction: any) {
  // Mock Airtel Money refund processing
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    message: "Remboursement Airtel Money traité avec succès",
    refundId: `AIRTEL_REFUND_${Date.now()}`,
  }
}

async function processOrangeRefund(transaction: any) {
  // Mock Orange Money refund processing
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    message: "Remboursement Orange Money traité avec succès",
    refundId: `ORANGE_REFUND_${Date.now()}`,
  }
}
