define [ 'extm', 'src/apps/footer/footer-view' ], ( Extm, FooterView )->

    class FooterController extends Extm.RegionController

        initialize : ->
            @wait()

        onComplete : ->
            @show new FooterView

    msgbus.registerController 'footer', FooterController