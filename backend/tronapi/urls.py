from django.urls import path
from . import views
from .views import get_contract_transactions

urlpatterns = [
    # Ruta para obtener el saldo TRX de una dirección específica. Utiliza la vista 'get_trx_balance'.
    path("trx/get-balance/<str:address>", views.get_trx_balance, name='Get TRX Balance'),

    path('trx/qr-code/<str:address>/', views.generate_qr_code, name='Generate QR Code'),

    # Ruta para obtener las transacciones TRX de una dirección específica. Utiliza la vista 'get_trx_transactions'.
    path("trx/get-transactions/<str:address>", views.get_trx_transactions,
         name='Get TRX Transactions'),

    # Ruta para generar un código Qr de la address especifícada.
    path("generate-qr/<str:address>", views.generate_qr_code, name="Generate Qr"),

    # Ruta para validar una dirección en la red. Utiliza la vista 'validate_address'.
    path("validate-address/<str:address>", views.validate_address, name="Validate Address"),

    # Ruta para obtener la historia de bloques. Utiliza la vista 'get_history_blocks'.
    path('block/get-history/<str:quantity>', views.get_history_blocks, name="Get Block History"),

    # Ruta para obtener las transacciones de un bloque específico. Utiliza la vista 'get_block_transactions'.
    path("block/get-transactions/<str:block>", views.get_block_transactions, name="Get Block Transactions"),

    path("contract-transactions/<str:contract_address>/", views.get_contract_transactions, name="get_contract_transactions"),

    path('export-to-excel/<str:address>/', views.export_to_excel, name='export_to_excel'),
]
