import { Dialog } from '@headlessui/react'

const ContextModal = ({ isOpen, onNext }) => {

   const RockPaperS = [

        {   
            title: "First Explanation: Generating a random number in JavaScript",
            RandomNumberExplaination: "JavaScript has Math.random() which gives a random number between 0 and 1. We can multiply it to get a random index for Rock, Paper, Scissors."
        },

       

   ]
    

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-[1200px] h-[400px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold mb-4">{RockPaperS[0].title}</h3>
            <p className="text-gray-600">
                {RockPaperS[0].RandomNumberExplaination}
            </p>
          <div className="absolute bottom-4 right-4">
            <button
              type="button"
              onClick={onNext}
              className="inline-flex justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Next
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default ContextModal